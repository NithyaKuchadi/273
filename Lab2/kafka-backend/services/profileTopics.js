const restaurants = require("../models/restaurant_schema");
const users = require("../models/user_schema");

exports.profileService = function profileService(msg, callback) {
   switch (msg.path) {
        case "updateProfile":
            updateProfile(msg, callback);
            break;
        case "updateRestaurant":
            updateRestaurant(msg, callback);
            break;
        
    }
};
function updateProfile(msg, callback) {
    let updatedData={
        "username":msg.body.username,
        "email":msg.body.email,
        "phonenumber": msg.body.phonenumber,
        "profileimage":msg.body.profileimage,
        "address":msg.body.address
    }
  users.findOneAndUpdate({ '_id': msg.body.userid }, { $set: updatedData  }, function (err, res) {
       if (res) {
            callback(null,  res );
        }
          })
}
function updateRestaurant(msg, callback) {
    let updatedData={
        "restaurantname":msg.body.restaurantname,
        "cuisine": msg.body.cuisine,
        "restaurantimage":msg.body.restaurantimage
    }
 restaurants.findOneAndUpdate({ 'ownerid': msg.body.userid }, { $set: updatedData }, function (err, res) {
        if (res) {
             callback(null, res );
        }
          })
}