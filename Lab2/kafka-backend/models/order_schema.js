var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//schema
OrderSchema = new Schema({
  itemid: {
    type: String,
    default: ''
  },
  userid: {
    type: String,
    default: ''
  },
  restaurantid: {
    type: String,
    default: ''
  },
  quantity: {
    type: String,
    default: ''
  },
  price: {
    type: String,
    default: ''
  },
  statusoforder: {
    type: String,
    default: ''
  }

});
    
module.exports = mongoose.model('orders', OrderSchema); 