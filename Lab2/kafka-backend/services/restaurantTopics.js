const restaurants = require("../models/restaurant_schema");

exports.restaurantService = function restaurantService(msg, callback) {
    switch (msg.path) {
        case "addRestaurant":
            addRestaurant(msg, callback);
            break;
        case "getRestaurantDetails":
            getRestaurantDetails(msg, callback);
            break;
        case "getRestaurantsOnID":
            getRestaurantsOnID(msg, callback);
            break;
       
    }
};
function addRestaurant(msg, callback) {
 
    let data = {
          "restaurantname":msg.body.restaurantname,
          "ownerid": msg.body.userID,
          "zipcode": msg.body.zipcode
        }
     restaurants.create(data, function (err, res) {
        if (err) {
            callback(err, "unable to read the database");
        } else if (res) {
           callback(null, { status: 200, res });
        }
        })
}
function getRestaurantDetails(msg, callback) {
     restaurants.findOne({ ownerid : msg.userid },function(err,res){
      if (res) {
           callback(null, { status: 200, res });
        }
      })
}
function getRestaurantsOnID(msg, callback) {
     restaurants.findOne({ _id : msg.restid },function(err,res){
       if (res) {
            callback(null,  res);
        }
      })
    }