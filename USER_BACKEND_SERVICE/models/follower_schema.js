var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//schema
followerSchema= new Schema({
    userId: {
		type: Number,
        required: true
    },
    followers: {
		type: Array,
        required: true
    },
	followersCount: {
		type: Number,
        required: true
    }

});
    
module.exports = mongoose.model('follower', followerSchema); 