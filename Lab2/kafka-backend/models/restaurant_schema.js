var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//schema
RestaurantSchema = new Schema({
  restaurantname: {
    type: String,
    default: ''
  },
  zipcode: {
    type: Number,
    default: ''
  },
  cuisine: {
    type: String,
    default: ''
  },
  restaurantimage: {
    type: String,
    default: ''
  },
  ownerid: {
    type: String,
    default: ''
  }
});
    
module.exports = mongoose.model('restaurants', RestaurantSchema); 