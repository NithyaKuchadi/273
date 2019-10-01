const express = require('express');
const router = express.Router();
const menuDao = require("../dao/menuDao");
const menuDaoObj = new menuDao();
const restaurantDao = require("../dao/restaurantDao");
const restaurantDaoobj = new restaurantDao();

const sha1 = require('sha1');
router.post("/getRestaurantNames", (req, res) => {
  let itemName = req.body.NameOfItem;

  try {
    getRestaurantNames = async () => {
      let result = await menuDaoObj.getRestIDS(itemName);
      let restNames = [];
      if (result[0]) {
        for (let i = 0; i < result.length; i++) {
          let restid = result[i].idofrest;
          let restaurant = await restaurantDaoobj.getRestaurantsOnID(restid);
          restNames.push(restaurant[0]);
          }
        
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify(restNames));
      }
      else {
        res.status(200).json({ responseMessage: 'Could not get all details' });
      }
    }
    getRestaurantNames();
  }
  catch (error) {
    res.status(500).json({ responseMessage: 'Database not responding' });
  }
});
router.post("/getItemsSections", (req, res) => {
  let resID = req.body.RestaurantID;
  
  try {
    getItemsSections = async () => {
      let result = await menuDaoObj.getAllSections(resID);
      
      let itemdatalist = [];
      if (result[0]) {
        for (let i = 0; i < result.length; i++) {
          let sectionID = result[i].SectionID;
          let sectionName = result[i].SectionName;
          
          let items = await menuDaoObj.getAllItems(resID, sectionID);

          let itemdata = {
            "SectionID": sectionID,
            "SectionName": sectionName,
            "Items": items
          }

          itemdatalist.push(itemdata);
        }
        
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify(itemdatalist));
      }
      else {
        res.status(200).json({ responseMessage: 'Could not get Items' });
      }
    }
    getItemsSections();
  }
  catch (error) {
    res.status(500).json({ responseMessage: 'Database not responding' });
  }
});

router.post("/getItemsONItemID", (req, res) => {
  let itemID = req.body.itemID;
  
  try {
    getItemsONItemID = async () => {
      let result = await menuDaoObj.getItemsBasedOnItemID(itemID);
      
      if (result[0]) {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify(result[0]));
      }
      else {
        res.status(200).json({ responseMessage: 'Could not get all details' });
      }
    }
    getItemsONItemID();
  }
  catch (error) {
    res.status(500).json({ responseMessage: 'Database not responding' });
  }
});
module.exports = router;
