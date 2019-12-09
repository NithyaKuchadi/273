var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//schema
UserSchema = new Schema({
  firstname: {
    type: String,
    default: ''
  },
  lastname: {
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
  usertype: {
    type: String,
    default: ''
  },
  restaurant: {
    type: String,
    default: ''
  },
  cuisine: {
    type: String,
    default: ''
  },
  phoneNumber: {
    type: String,
    default: ''
  },
  Address: {
    type: String,
    default: ''
  }

});
    
module.exports = mongoose.model('user', UserSchema); 