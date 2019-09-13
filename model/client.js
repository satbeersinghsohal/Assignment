var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var Client = new Schema({
    username : String,
    email : String,
    course: [{type:String}],
    tel:{type:Number},
    claim: {type:Boolean,default:false},
    claimedby: {type:String,default:""},
})

module.exports = mongoose.model('Client', Client);
