const express = require('express');
const router = express.Router();
var kafka = require('../kafka/client');
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', { session: false });

router.post("/getRestaurantNames", (req, res) => {
  let itemName = req.body.NameOfItem;
  let data = {
    "itemName": itemName
  }
  kafka.make_request('menu_Topics', { "path": "getRestIDS", "body": data }, function (err, result) {
    if (result) {
      res.end(JSON.stringify(result));
    }
  })
})


router.post("/getItemsSections", (req, res) => {
  let RestaurantID = req.body.RestaurantID;

  kafka.make_request('menu_Topics', { "path": "getSectionsItems", "RestaurantID": RestaurantID }, function (err, result) {
    if (result) {
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify(result));
    }
  })
});

router.post("/getItemsONItemID",(req, res) => {
  let itemID = req.body.itemID;
  kafka.make_request('menu_Topics', { "path": "getItemsBasedOnItemID", "itemID": itemID }, function (err, items) {
    if (err) {
      res.status(500).json({ responseMessage: 'Database not responding' });
    } else if (items) {
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify(items));
    }
  });
})
module.exports = router;
