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
  restaurantid: {
    type: String,
    default: ''
  },
  sectionid: {
    type: String,
    default: ''
  },
  itemimage: {
    type: String,
    default: ''
  }

});
    
module.exports = mongoose.model('items', ItemSchema); 