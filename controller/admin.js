const Client 	= require('../model/client')
const User 		= require('../model/User')


var user = null;



exports.fetchLeads = (req,res,next) => {
	if(req.user == null){
		return res.send('please loginin')
	}
	switch(req.query.leadtype){
		case 'unclaimleads':  Client
								.findAll({where:{claimed:null}})
								.then((r) => res.send(r)); break;


		case 'myleads' : 	  Client
								.findAll({where:{claimed:true,claimedby:req.user.id}})
								.then((r) => res.send(r));break;


		default : res.send("wrong query");

	}
}



exports.claimALead = (req,res,next) => {
	if(req.user == null){
		return res.send('please login');
	}
	const clientid = req.body.lead_id;

	if(clientid){
		Client.findByPk(clientid)
		.then(clientdetails => {
			clientdetails.claimed =true;
			clientdetails.claimedby = req.user.id;
			return clientdetails.save();
		})
		.then(result => {
			console.log("client with clientid is claimedby",req.user.id);
			res.send({msg:"client with clientid"+clientid+" is claimedby",userid:req.user.id})
		})
	}
}



exports.signup = (req,res,next) => {
	const { username , password } = req.body;
	User
	.create({username,password})
	.then((r) => {console.log(r);res.send(r)})
	.catch((err) => console.log(err));
}


// exports.signin = (req,res,next) =>{



// 	const { username , password } = req.body;
// 	console.log("ok in singin");

// 	passport.authenticate('local',function(err,user,info) {
// 		if(err){
// 			return res.send(err);
// 		}
// 		if(!user){
// 			return res.send("no user found");
// 		}
// 		if(user){
// 			req.logIn(user,function(err) {
// 				if(err){
// 					return res.send("error occur")
// 				}
// 				return res.send(user);
// 			})
// 		}
// 	})




	// User
	// .findOne({where :{ username: username}})
	// .then((r) => {
	// 	if(!r){
	// 		return res.send("username is wrong");
	// 	}
	// 	user = r;
	// 	res.send(r);
	// })
	// .catch((err) => console.log(err));

// }

















