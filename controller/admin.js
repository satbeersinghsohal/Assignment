const Client 	= require('../model/client')
const User 		= require('../model/User')

const passport  = require('passport');

var user = null;

exports.fetchLeads = (req,res,next) => {
	if(user == null){
		return res.send('please loginin')
	}
	switch(req.query.leadtype){
		case 'unclaimleads':  Client
								.findAll({where:{claimed:null}})
								.then((r) => res.send(r)); break;


		case 'myleads' : 	  Client
								.findAll({where:{claimed:true,claimedby:user.id}})
								.then((r) => res.send(r));break;


		default : res.send("wrong query");

	}
}



exports.claimALead = (req,res,next) => {
	if(user == null){
		return res.send('please login');
	}
	const clientid = req.body.lead_id;

	if(clientid){
		Client.findByPk(clientid)
		.then(clientdetails => {
			clientdetails.claimed =true;
			clientdetails.claimedby = user.id;
			return clientdetails.save();
		})
		.then(result => {
			console.log("client with clientid is claimedby",user.id);
			res.send("client with clientid is claimedby",user.id)
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

exports.signin = (req,res,next) =>{
	const { username , password } = req.body;
	User
	.findOne({where :{ username: username}})
	.then((r) => {
		if(!r){
			return res.send("username is wrong");
		}
		user = r;
		res.send(r);
	})
	.catch((err) => console.log(err));

}

















