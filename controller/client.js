const Client 	= require('../model/client')
const Test 	= require('../model/test')


exports.storedetails = (req,res,next) => {
	const {username,email,tel} = req.body;

	Client
	.create({username,email,tel})
	.then((r) => {console.log(r);res.send(r)})
	.catch((err) => console.log(err));
}


exports.storeintest = (req,res,next) => {
 	res.send("sdfs")
}


