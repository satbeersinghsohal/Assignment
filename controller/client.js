const Client 	= require('../model/client')


exports.storedetails = (req,res,next) => {
	const {username,email,tel} = req.body;

	Client
	.create({username,email,tel})
	.then((r) => {console.log(r);res.send(r)})
	.catch((err) => console.log(err));
}



