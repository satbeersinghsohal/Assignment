var express  = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var db = mongoose.connect('mongodb://localhost/test',{useNewUrlParser:true});
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

var app = express();


// importing Models from model folder
var Client = require('./model/client');
var User = require('./model/User');

var userdetails = null;

//#################### adding middleware ###########################

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(passport.initialize());
app.use(passport.session());

//###################### middleware end#################

//##################### authentication or passport middleware######################


passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findById(id, function(err, user) {
    cb(err, user);
  });
});



passport.use(new LocalStrategy(
  function(username, password, done) {
  	console.log("hello ",username,password)
      User.findOne({
        username: username
      }, function(err, user) {
        if (err) {
        	console.log("error")
          return done(err);
        }
        console.log(user)
        userdetails = user;

        if (!user) {
        	console.log("no user")

          return done(null, false);
        }

        if (user.password != password) {
        	console.log("password error")
          return done(null, false);
        }
        	console.log("Auth success")

        return done(null, user);
      });
  }
));



//################ All routes ###############################

	app.get('/success', (req, res) => res.send("Welcome "+req.query.username+"!!"));
	app.get('/error', (req, res) => res.send("error logging in"));

	app.post("/form",function(req,res){ // client form 

		console.log(req.body.username,
	    req.body.email,
	    req.body.tel,
	    req.body.course)
		var user = new Client();
	    // user.userid   = req.body.userid;
	    user.username = req.body.username;
	    user.email    = req.body.email;
	    user.tel      = req.body.tel;
	    user.course    = req.body.course;
	    user.save(function(err, saveduser){
	        if(err){
	            res.status(404).send({error:"could not saved"})
	        }else {
	            res.send({"msg":saveduser});
	        }
	    })
	})

	//################# employee login route ###############################

	app.post('/',
	  passport.authenticate('local', { failureRedirect: '/error' }),
	  function(req, res) {

	  	console.log("success");
	    res.redirect('/dashboard');
	  });



	//##################### sign up new employee route ############################
	app.post('/newuser',function(req, res) {
	  	console.log("success")
	  	console.log("username",req.body.username);
	  	var user = new User();
	  	user.username = req.body.username;
	  	user.password = req.body.password;
	    user.save(function(err, saveduser){
	        if(err){
	            res.status(404).send({error:"could not saved"})
	        }else {
	            res.send({"msg":saveduser});
	        }
	    })
	    res.redirect('/dashboard'); // redirecting to dashboard
	  });




    //###################### Fetch Leads (all claimed or unclaimed leads) ######################### 
	app.get("/dashboard",function(req,res) { 

		console.log("dashboard");
		// console.log(Object.keys( req));
		if(!userdetails.username){
			return res.send({"msg":"your not logged in"})
		}

		console.log(userdetails.username);

		if(req.query.page == "myleads"){
			Client.find({"claim":true,"claimedby":userdetails.username},function(err,data){
				res.send(data);
			})
		}else
		{
			Client.find({"claim":false},function(err,data){
				res.send(data);
			})
		}

	})

	//###################### Lead claimed by employee Route #####################################
	app.post("/dashboard",function(req,res) {

		if(!userdetails.username){
			res.send({"msg":"your not logged in"})
		}

		// console.log(userdetails.username);
		if(req.body.claim  && req.body.clientemail != null){
			Client.update({"email":req.body.clientemail},{"claim":true,"claimedby":userdetails.username},function(err,data){
				if(err){
					res.send(err);
				}else{
					
				res.send(data);
				}
			})
		}else{


		res.send({"error":"claim not given"})
		}
	})






app.listen(3000)