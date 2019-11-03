const express = require('express');
const router = express.Router();
var kafka = require('../kafka/client');

const sha1 = require('sha1');
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', { session: false });

router.post("/addItem",(req, res) => {
  let userid = req.body.UserID;
  let itemName = req.body.NameOfItem;
  let DescriptionOfItem = req.body.DescriptionOfItem;
  let priceOfItem = req.body.PriceOfItem;
  let SectionName = req.body.SectionName;
  let ItemImage = req.body.ItemImage;
  kafka.make_request('restaurant_Topics', { "path": "getRestaurantDetails", "userid": userid }, function (err, restaurant) {
    if (restaurant) {
      let data = {
        RestaurantID: restaurant.res._id,
        SectionName: SectionName
      }
      kafka.make_request('menu_Topics', { "path": "getSectionID", "body": data }, function (err, section) {
        if (section) {

          let itemObj = {
            "restaurantid": restaurant.res._id,
            "name": itemName,
            "sectionid": section._id,
            "description": DescriptionOfItem,
            "price": priceOfItem,
            "itemimage": ItemImage
          }
          kafka.make_request('menu_Topics', { "path": "addnewItem", "body": itemObj }, function (err, newItem) {
            if (newItem) {

              res.writeHead(200, { 'content-type': 'application/json' });
              res.end(JSON.stringify(newItem));

            }

          })
        }
      })
    }
  })

})

router.post("/UpdateItem", (req, res) => {
  let userid = req.body.UserID;
  let itemName = req.body.NameOfItem;
  let DescriptionOfItem = req.body.DescriptionOfItem;
  let priceOfItem = req.body.PriceOfItem;
  let itemid = req.body.ItemID;
  let ItemImage = req.body.ItemImage;

  kafka.make_request('restaurant_Topics', { "path": "getRestaurantDetails", "userid": userid }, function (err, restaurant) {
    if (restaurant) {

      let itemObj = {
        "name": itemName,
        "description": DescriptionOfItem,
        "price": priceOfItem,
        "itemimage": ItemImage
      }

      kafka.make_request('menu_Topics', { "path": "updateItem", "itemid": itemid, "restaurantid": restaurant.res._id, "body": itemObj }, function (err, updateitem) {
        if (updateitem) {
          res.status(200).json({ responseMessage: 'Updated the Item' });
        }
      })
    }
  })
})


router.post("/deleteItem", (req, res) => {

  let itemid = req.body.itemid;
  kafka.make_request('menu_Topics', { "path": "deleteItem", "itemid": itemid }, function (err, deleteItem) {
    if (deleteItem) {
      res.status(200).json({ responseMessage: 'Deleted the Item' });
    }
  })
});

router.post("/addSection",(req, res) => {
  let sectionName = req.body.SectionName;
  let userid = req.body.UserID;

  kafka.make_request('restaurant_Topics', { "path": "getRestaurantDetails", "userid": userid }, function (err, restaurant) {
    if (restaurant) {
      let sectionObj = {
        "sectionname": sectionName,
        "restaurantid": restaurant.res._id
      }
      kafka.make_request('menu_Topics', { "path": "addnewSection", "body": sectionObj }, function (err, section) {
        if (section) {
          res.writeHead(200, { 'content-type': 'application/json' });
          res.end(JSON.stringify(section));

        }
      })
    }
  })
});
router.post("/UpdateSection",(req, res) => {

  let sectionName = req.body.SectionName;
  let sectionID = req.body.SectionId;
  let userid = req.body.UserID;
  kafka.make_request('restaurant_Topics', { "path": "getRestaurantDetails", "userid": userid }, function (err, restaurant) {
    if (restaurant) {

      kafka.make_request('menu_Topics', { "path": "updateSection", "restid": restaurant.res._id, "sectionID": sectionID, "sectionName": sectionName }, function (err, updatesection) {
        if (updatesection) {
          res.writeHead(200, { 'content-type': 'application/json' });
          res.end(JSON.stringify(updatesection));
        }
      })
    }
  })
});

router.post("/getAllSections",(req, res) => {
  let userID = req.body.UserID;

  kafka.make_request('restaurant_Topics', { "path": "getRestaurantDetails", "userid": userID }, function (err, restaurant) {
    if (restaurant) {
      kafka.make_request('menu_Topics', { "path": "getAllSections", "RestaurantID": restaurant.res._id }, function (err, getAllSections) {
        if (getAllSections) {
          let arr = [];
          for (let k = 0; k < getAllSections.length; k++) {
            let obj = {
              _id: getAllSections[k]._id,
              sectionname: getAllSections[k].sectionname
            }
            arr.push(obj);
          }
          res.writeHead(200, { 'content-type': 'application/json' });
          res.end(JSON.stringify(arr));
        }

      });
    }
  })
})

router.post("/deleteSection",(req, res) => {

  let userid = req.body.UserID;
  let sectionid = req.body.sectionid;
  kafka.make_request('restaurant_Topics', { "path": "getRestaurantDetails", "userid": userid }, function (err, restaurant) {
    if (restaurant) {

      kafka.make_request('menu_Topics', { "path": "deleteSection", "RestaurantID": restaurant.res._id, "sectionid": sectionid }, function (err, deleteSection) {
        if (deleteSection) {
          res.writeHead(200, { 'content-type': 'application/json' });
          res.end(JSON.stringify(deleteSection));
        }
      })
    }
  })
});
router.post("/getAllItems", (req, res) => {
  let userID = req.body.UserID;
  let sectionID = req.body.SectionID;

  kafka.make_request('restaurant_Topics', { "path": "getRestaurantDetails", "userid": userID }, function (err, restaurant) {
    if (restaurant) {

      kafka.make_request('menu_Topics', { "path": "getAllItems", "RestaurantID": restaurant.res._id, "sectionID": sectionID }, function (err, getAllItems) {
        if (getAllItems) {

          res.writeHead(200, { 'content-type': 'application/json' });
          res.end(JSON.stringify(getAllItems));
        }
      })
    }
  })

});



module.exports = router;
