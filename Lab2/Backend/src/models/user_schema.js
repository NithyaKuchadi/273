var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//schema
UserSchema = new Schema({
  username: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  },
  phonenumber: {
    type: Number,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  usertype: {
    type: String,
    default: ''
  },
  profileimage: {
    type: String,
    default: ''
  },
});
    
module.exports = mongoose.model('user', UserSchema); 