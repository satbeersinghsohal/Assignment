var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var User = new Schema({
    username        : String,
	password        : String,    
})

module.exports = mongoose.model('User', User);
