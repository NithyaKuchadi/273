const express = require('express');
const router = express.Router();
const menuDao = require("../dao/menuDao");
const menuDaoObj = new menuDao();
const restaurantDao = require("../dao/restaurantDao");
const restaurantDaoobj = new restaurantDao();

const sha1 = require('sha1');

router.post("/addItem",(req,res)=>
{
    let userID = req.body.UserID;
    let itemName = req.body.NameOfItem;
    let DescriptionOfItem = req.body.DescriptionOfItem;
    let priceOfItem = req.body.PriceOfItem;
    let SectionName = req.body.SectionName;
    let ItemImage= req.body.ItemImage;
   
   
    addItem= async ()=>
    {
      let restid= await restaurantDaoobj.getRestaurantDetails(userID);
      let section= await menuDaoObj.getSectionID(restid[0].RestaurantID,SectionName);

      let itemObj={
          "idofrest":restid[0].RestaurantID,
          "NameOfItem":itemName,
          "sectID":section[0].SectionID,
          "DescriptionOfItem":DescriptionOfItem,
           "PriceOfItem":priceOfItem,
           "ItemImage":ItemImage
        }

      let result= await menuDaoObj.addnewItem(itemObj,restid[0].RestaurantID,section[0].SectionID);
      console.log("Result is "+result[0]);
      if(result[0])
      {
        res.writeHead(200, {'content-type':'application/json'});
        res.end(JSON.stringify(result));

      }
      else
      {
        res.status(200).json({responseMessage: 'Could not add Item'});
      }
    }
try{
    addItem(); 
}
catch(error)
{
    res.status(500).json({responseMessage: 'Database not responding'});
}
}
);
router.post("/UpdateItem",(req,res)=>
{
    let userid = req.body.UserID;
    let itemName = req.body.NameOfItem;
    let DescriptionOfItem = req.body.DescriptionOfItem;
    let priceOfItem = req.body.PriceOfItem;
    let itemid=req.body.ItemID;
    let ItemImage=req.body.ItemImage;
  try{
    UpdateItem= async ()=>
    {
      let restid= await restaurantDaoobj.getRestaurantDetails(userid);
        let itemObj={
           
            "NameOfItem":itemName,
            "DescriptionOfItem":DescriptionOfItem,
            "PriceOfItem":priceOfItem,
            "ItemImage":ItemImage
          }
      let result= await menuDaoObj.updateItem(restid[0].RestaurantID,itemid,itemObj);
      if(result)
            res.status(200).json({responseMessage: 'Updated the Item'});
      else
            res.status(200).json({responseMessage: 'Could not update the Item'});
    }
    UpdateItem(); 
}
catch(error)
{
    res.status(500).json({responseMessage: 'Database not responding'});
}
});

router.post("/deleteItem",(req,res)=>
{
  try{
    deleteItem= async ()=>
    {
   
    let itemid = req.body.itemid;
      let result=menuDaoObj.deleteItem(itemid);
      if(result)
            res.status(200).json({responseMessage: 'Deleted the Item'});
      else
        res.status(200).json({responseMessage: 'Could not delete the Item'});
    }
    deleteItem(); 
}
catch(error)
{
    res.status(500).json({responseMessage: 'Database not responding'});
}
});

router.post("/addSection",(req,res)=>
{
    let sectionName = req.body.SectionName;
    let userid=req.body.UserID;  
 
    addSection= async ()=>
    {
      let id= await restaurantDaoobj.getRestaurantDetails(userid);
      let sectionObj={
          "SectionName":sectionName,
          "idOfRestaurant":id[0].RestaurantID
        }
       
      let result= await menuDaoObj.addnewSection(sectionObj,id[0].RestaurantID);
     
      if(result[0])
      {
        res.writeHead(200, {'content-type':'application/json'});
        res.end(JSON.stringify(result));

      }
      else
      {
        res.status(200).json({responseMessage: 'Could not add Section'});
      }
    }
try{
    addSection(); 
}
catch(error)
{
    res.status(500).json({responseMessage: 'Database not responding'});
}});
router.post("/UpdateSection",(req,res)=>
{
  
    let sectionName = req.body.SectionName;
    let sectionID=req.body.SectionId;
    let userid=req.body.UserID;

   
    UpdateSection= async ()=>
    {
      let id= await restaurantDaoobj.getRestaurantDetails(userid);
      let result= await menuDaoObj.updateSection(sectionName,sectionID,id[0].RestaurantID);
     
      if(result[0])
            {
              res.writeHead(200, {'content-type':'application/json'});
              res.end(JSON.stringify(result));
            }
            else
            {
              res.status(200).json({responseMessage: 'Could not get all details'});
            }
    }
try{
  UpdateSection(); 
}
catch(error)
{
    res.status(500).json({responseMessage: 'Database not responding'});
}});

router.post("/getAllSections",(req,res)=>
{
    let userID = req.body.UserID;
    
  try{
    getAllSections= async ()=>
    {
      let restid= await restaurantDaoobj.getRestaurantDetails(userID);
      console.log("Restaurant id is "+restid[0].RestaurantID);
      let result=await menuDaoObj.getAllSections(restid[0].RestaurantID);

          if(result[0])
            {
              res.writeHead(200, {'content-type':'application/json'});
              res.end(JSON.stringify(result));
            }
            else
            {
              res.status(200).json({responseMessage: 'Could not get all details'});
            }
    }
    getAllSections(); 
}
catch(error)
{
    res.status(500).json({responseMessage: 'Database not responding'});
}
});

router.post("/deleteSection",(req,res)=>
{
  try{
    deleteSection= async ()=>
    {
      let userid=req.body.UserID;
      let restid= await restaurantDaoobj.getRestaurantDetails(userid);
      let sectionid = req.body.sectionid;
      let result=await menuDaoObj.deleteSection(restid[0].RestaurantID,sectionid);
      console.log("result in delete section is "+result);
      if(result[0])
            {
              res.writeHead(200, {'content-type':'application/json'});
              res.end(JSON.stringify(result));
            }
            else
            {
              res.status(200).json({responseMessage: 'Could not delete section'});
            }
    }
    deleteSection();
}
catch(error)
{
    res.status(500).json({responseMessage: 'Database not responding'});
}
});
router.post("/getAllItems",(req,res)=>
{
    let userID = req.body.UserID;
    let sectionID=req.body.SectionID;
    
  try{
    getAllItems= async ()=>
    {
      let restid= await restaurantDaoobj.getRestaurantDetails(userID);
      let result=await menuDaoObj.getAllItems(restid[0].RestaurantID,sectionID);

          if(result[0])
            { 
              res.writeHead(200, {'content-type':'application/json'});
              res.end(JSON.stringify(result));
            }
            else
            {
              res.status(200).json({responseMessage: 'Could not get all details'});
            }
    }
    getAllItems(); 
}
catch(error)
{
    res.status(500).json({responseMessage: 'Database not responding'});
}
});



module.exports = router;
