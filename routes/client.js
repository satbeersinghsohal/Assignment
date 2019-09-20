const express = require('express');
const router = express.Router();
const graphqlHTTP = require('express-graphql');
const { buildSchema,execute, subscribe } = require('graphql');
const { PubSub } = require('graphql-subscriptions');


const clientController = require('../controller/client') 	

const Client 	= require('../model/client')


const pubsub = new PubSub();



router.post('/form', clientController.storedetails)

router.post('/test',clientController.storeintest)




const schema = buildSchema(
	`
		type Query {
			storedetails(username:String! ,email:String! ,tel:String) : Result
			finduser(id:Int!):User
		},

		type User {
			username: String
			email: String,
			tel: String,
			id: Int
		}


		type Result {
			msg:String
		}

		type Mutation {
			updatedetails(id:Int!,username:String,email:String,tel:String) : User
			deleteform(id:Int!):Result
			addmsg(msg:String!):Result
		}

		type Subscription {
			msgadded: Result
		}


	`
)


const root = {
	storedetails: (args,parent) => {
		console.log(args);
		// console.log(parent)
		const {username,email} = args;
		const tel = parseInt(args.tel)
		return new Promise((resolve,reject) => {
		// await 
			Client
			.create({username,email,tel})
			.then((r) => {console.log("result",r); resolve( {msg:"success",result:r});})
			.catch((err) => {console.log("err",err);reject( {msg:"failed",error:err})});
		})
		// return {msg:"sfsdf"};
	},
	finduser: async(args,parent) => {
		console.error(args);
		const {id} = args;


		return new Promise((resolve,reject) => {
			Client
			.findOne({where:{id:id}})
			.then(r => resolve(r))
			.catch(err => reject(err));
			
		})
	},

	updatedetails:(args,parent) => {
		console.log(args);
		const {id,username,email} = args;
		const tel = parseInt(args.tel)
		return new Promise((resolve,reject) => {
			Client
			.findOne({where:{id:id}})
			.then(user=> {
				user.username = username || user.username;
				user.email    = email || user.email;
				user.tel 	= tel || user.tel;
				user.save()
				.then(() => resolve(user) )

			})
			.error(err => reject(err));
		})
	},

	deleteform:(args,parent) => {
		console.log(args);
		const {id} = args;
		return new Promise((resolve,reject) => {
			Client
			.delete({where:{}})
		})
	},

	addmsg:(args,parent) => {
		const {msg} = args;
		console.log(msg);
		pubsub.publish("new message", {msgadded: msg});
		return {msg};
	},

	msgadded:(args,parent) => {
		subscribe: () => pubsub.asyncIterator("new message");
	}


}

router.use('/graphql',graphqlHTTP({
	schema: schema,
	rootValue:root,
	graphiql:true
}))




module.exports = router;
