const express = require('express');
const router = express.Router();
// const adminController = require('../const')

const adminController = require('../controller/admin');
const User = require('../model/User');

const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport')



passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findByPk(id)
  .then(user => {
    cb(null, user);
  });
});



passport.use(new LocalStrategy(
  function(username, password, done) {
  	console.log("hello ",username,password)
      User.findOne({
        where:{username: username}
      } 
      ).then( user => {
    
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



router.get('/success', (req, res) => res.send("Welcome "+req.user.username+"!!"));
router.get('/error', (req, res) => res.send("error logging in"));



router.get('/', adminController.fetchLeads)



router.post('/claimlead',adminController.claimALead)

router.post('/signup',adminController.signup)

router.post('/signin', passport.authenticate('local', { failureRedirect: '/error' }),
	  function(req, res) {
	  	// if(req.user){
	  	// 	req.session = req.user;
	  	// }
	  	console.log("success",req.user);
	    res.redirect('/admin/success');
	  });


module.exports = router