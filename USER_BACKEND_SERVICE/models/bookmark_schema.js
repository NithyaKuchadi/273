var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//schema
BookmarkSchema = new Schema({
  userId: {
    type: Number,
    default: ''
  }
  
});
    
module.exports = mongoose.model('bookmark', BookmarkSchema); 