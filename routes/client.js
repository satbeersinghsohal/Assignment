const express = require('express');
const router = express.Router();
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const clientController = require('../controller/client') 	

const Client 	= require('../model/client')


router.post('/form', clientController.storedetails)

router.post('/test',clientController.storeintest)




const schema = buildSchema(
	`
		type Query {
			storedetails(username:String! ,email:String! ,tel:Int) : Result
		},

		type Result {
			msg:String
		}

	`
)


const root = {
	storedetails: async(args,parent) => {
		console.log(args);
		// console.log(parent)
		const {username,email,tel} = args;
		await 
		// return new Promise((resolve,reject) => {
			Client
			.create({username,email,tel})
			.then((r) => {console.log("result",r); resolve( {msg:"success",result:r});})
			.catch((err) => {console.log("err",err);reject( {msg:"failed",error:err})});
		// })
		// return {msg:"sfsdf"};
	},

}

router.use('/graphql',graphqlHTTP({
	schema: schema,
	rootValue:root,
	graphiql:true
}))


module.exports = router;
