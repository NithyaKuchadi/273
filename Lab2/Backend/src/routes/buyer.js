const express = require('express');
const router = express.Router();
const menuDao = require("../dao/menuDao");
const menuDaoObj = new menuDao();
const restaurantDao = require("../dao/restaurantDao");
const restaurantDaoobj = new restaurantDao();
const path = require('path');
var fs = require('fs');
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
          console.log("restaurant id is " + restaurant);
          restNames.push(restaurant[0]);
          console.log("Image" + restaurant[0].RestaurantImage);
          console.log(restaurant[0].RestaurantName);
        }
        console.log("Restaurant Names:  " + restNames);

        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify(restNames));
      }
      else {
        res.status(220).json({ responseMessage: 'Could not get all details' });
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
  console.log("did it come here?????" + resID);
  try {
    getItemsSections = async () => {
      let result = await menuDaoObj.getAllSections(resID);
      console.log("result     " + result);
      let itemdatalist = [];
      if (result[0]) {
        for (let i = 0; i < result.length; i++) {
          let sectionID = result[i].SectionID;
          let sectionName = result[i].SectionName;
          console.log("sectionID,  sectionName   " + sectionID + "------------" + sectionName);
          let items = await menuDaoObj.getAllItems(resID, sectionID);
          let itemsarr=[];
           for(let j=0;j<items.length;j++)
           {
            let item={
              "ItemID": items[j].ItemID,
              "NameOfItem": items[j].NameOfItem,
              "DescriptionOfItem": items[j].DescriptionOfItem,
              "PriceOfItem": items[j].PriceOfItem,
              "ItemImage":items[j].ItemImage
            }
            itemsarr.push(item);
           }

          let itemdata = {
            "SectionID": sectionID,
            "SectionName": sectionName,
            "Items": itemsarr
          }

          itemdatalist.push(itemdata);
        }
        console.log("itemList    " + itemdatalist);
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify(itemdatalist));
        console.log("itemList    " + itemdatalist);
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
