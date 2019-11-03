const express = require('express');
const router = express.Router();


var kafka = require('../kafka/client');
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', { session: false });

router.post("/showOrders",(req, res) => {
  let userID = req.body.UserID;
  let order_type = req.body.type;

  kafka.make_request('order_Topics', { "path": "FetchRestaurantID", "userID": userID }, function (err, restaurant) {
    if (restaurant) {
      let restaurantid = restaurant._id
      let data = {
        "resID": restaurantid,
        "order_type": order_type
      }
      kafka.make_request('order_Topics', { "path": "showOrders", "body": data }, function (err, allorders) {
        if (allorders) {
          res.writeHead(200, { 'content-type': 'application/json' });
          res.end(JSON.stringify(allorders));
        }
      })
    }

  })
})

router.post("/pastOrdersOfUser",(req, res) => {
  let userID = req.body.userID;
  let data = {
    "userID": userID

  }
  kafka.make_request('order_Topics', { "path": "getPastOrders", "body": data }, function (err, result) {
    if (result) {
      res.end(JSON.stringify(result));
    }

  })
})


router.post("/upcomingOrders",(req, res) => {
  let userID = req.body.userID;
  kafka.make_request('order_Topics', { "path": "getUpcomingOrders", "userID": userID }, function (err, result) {
    if (result) {
      res.end(JSON.stringify(result));
    }

  })
});

router.post("/UpdateOrder",(req, res) => {

  let orderID = req.body.id;
  let statusOfOrder = req.body.StatusOfOrder;
  let data = {
    "orderID": orderID,
    "statusOfOrder": statusOfOrder
  }
  kafka.make_request('order_Topics', { "path": "updateOrder", "body": data }, function (err, restaurantDetails) {
    if (restaurantDetails) {
      let userIDowner = req.body.UserID;
      let order_type = "new";

      kafka.make_request('order_Topics', { "path": "FetchRestaurantID", "userID": userIDowner }, function (err, restaurant) {
        if (restaurant) {
          let restaurantid = restaurant._id
          let data = {
            "resID": restaurantid,
            "order_type": order_type
          }
          kafka.make_request('order_Topics', { "path": "showOrders", "body": data }, function (err, allorders) {
            if (allorders) {
              res.writeHead(200, { 'content-type': 'application/json' });
              res.end(JSON.stringify(allorders));
            }
          })


        }
      })
    }
  })
})


router.post("/OrderItem", (req, res) => {
  let data = req.body;
  kafka.make_request('order_Topics', { "path": "addnewOrder", "body": data }, function (err, result) {
    if (result) {
      res.status(200).json({ responseMessage: 'Successfully Created' });
    }
  })
})



module.exports = router;
