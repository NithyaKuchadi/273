var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//schema
SectionSchema = new Schema({
  sectionname: {
    type: String,
    default: ''
  },
  restaurantid: {
    type: String,
    default: ''
  }
  
});
    
module.exports = mongoose.model('sections', SectionSchema); 