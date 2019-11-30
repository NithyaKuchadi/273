var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//schema
followingSchema= new Schema({
    userId: {
		type: Number,
        required: true
    },
    follows: {
		type: Array,
        required: true
    },
	followingCount: {
		type: Number,
        required: true
    }
});
    
module.exports = mongoose.model('following', followingSchema); 