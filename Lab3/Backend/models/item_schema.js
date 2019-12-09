var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//schema
ItemSchema = new Schema({
  name: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    default: ''
  },
  restaurantname: {
    type: String,
    default: ''
  },
  sectionid: {
    type: String,
    default: ''
  },
  sectionname:{
    type: String,
    default: ''
  }

});
    
module.exports = mongoose.model('items', ItemSchema); 