const express = require('express');
const router = express.Router();

const ordersDao = require("../dao/ordersDao");
const ordersDaoObj = new ordersDao();
const sha1 = require('sha1');
const signUpLoginDao = require("../dao/signUpLoginDao");
const signUpLoginDaoobj = new signUpLoginDao();
const menuDao = require("../dao/menuDao");
const menuDaoObj = new menuDao();
const restaurantDao = require("../dao/restaurantDao");
const restaurantDaoobj = new restaurantDao();

router.post("/showOrders", (req, res) => {
  try {
    FetchingOrders = async () => {
      let userIDowner = req.body.UserID;
      
      let resID = await ordersDaoObj.FetchRestaurantID(userIDowner);
      
      let result = await ordersDaoObj.showOrders(resID);
      let orders = [];
      for (let i = 0; i < result.length; i++) {
        let itemid = result[i].itemsofid;
        let userid = result[i].usersofid;

        let itemName = await menuDaoObj.FetchItemName(itemid);
        let j = 0;
        let userdetails = await signUpLoginDaoobj.getUserDetails(userid);
        
        let orderdetails = {
          "OrderID": result[i].OrderID,
          "PersonName": userdetails[j].UserName,
          "Address": userdetails[j].Address,
          "Item": itemName,
          "Quantity": result[i].Quantity,
          "Price": result[i].Price,
          "StatusOfOrder": result[i].StatusOfOrder
        }
        orders.push(orderdetails);
      }


      if (true) {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify(orders));
      }
      else
        res.status(200).json({ responseMessage: 'No Orders' });
    }
    FetchingOrders();
  }
  catch (error) {
    res.status(500).json({ responseMessage: 'Database not responding' });
  }
});

router.post("/pastOrdersOfUser", (req, res) => {
  try {
    pastOrdersOfUser = async () => {
      
      let userID = req.body.userID;
      let result = await ordersDaoObj.getPastOrders(userID, "Delivered");
      let pastorders = [];
      if (result[0]) {
        for (let i = 0; i < result.length; i++) {
          let restaurantid = result[i].RestaurantID;
          let restaurantDetails = await restaurantDaoobj.getRestaurantsOnID(restaurantid);
          let restaurantName = restaurantDetails[0].RestaurantName;
          let itemId = result[i].itemsofid;
          let itemDetails = await menuDaoObj.getItemsBasedOnItemID(itemId);
          let itemName = itemDetails[0].NameOfItem;
          
          let obj = {
            "OrderID": result[i].OrderID,
            "RestaurantName": restaurantName,
            "NameOfItem": itemName,
            "Quantity": result[i].Quantity,
            "Price": result[i].Price
          }
          pastorders.push(obj);
        }
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify(pastorders));
      }
      else {
        res.status(200).json({ responseMessage: 'Could not get all details' });
      }
    }
    pastOrdersOfUser();
  }
  catch (error) {
    res.status(500).json({ responseMessage: 'Database not responding' });
  }
});


router.post("/upcomingOrders", (req, res) => {
  try {
    upcomingOrders = async () => {
      
      let userID = req.body.userID;
      let orderStatus = "New"
      let result = await ordersDaoObj.getUpcomingOrders(userID, orderStatus);
      
      let getUpcomingOrders = [];
      if (result[0]) {
        for (let i = 0; i < result.length; i++) {
          let restaurantid = result[i].RestaurantID;
          let restaurantDetails = await restaurantDaoobj.getRestaurantsOnID(restaurantid);
          let restaurantName = restaurantDetails[0].RestaurantName;
          let itemId = result[i].itemsofid;
          let itemDetails = await menuDaoObj.getItemsBasedOnItemID(itemId);
          let itemName = itemDetails[0].NameOfItem;
          let obj = {
            "OrderID": result[i].OrderID,
            "RestaurantName": restaurantName,
            "NameOfItem": itemName,
            "Quantity": result[i].Quantity,
            "Price": result[i].Price,
            "StatusOfOrder": result[i].StatusOfOrder
          }
          getUpcomingOrders.push(obj);
        }
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify(getUpcomingOrders));
      }
      else {
        res.status(200).json({ responseMessage: 'Could not get all details' });
      }
    }
    upcomingOrders();
  }
  catch (error) {
    res.status(500).json({ responseMessage: 'Database not responding' });
  }
});

router.post("/UpdateOrder", (req, res) => {
  
  try {
    UpdateOrder = async () => {
      let orderID = req.body.id;
      let statusOfOrder = req.body.StatusOfOrder;
      
      let result = await ordersDaoObj.updateOrder(orderID, statusOfOrder);
      if (result) {
        res.status(200).json({ responseMessage: 'Updated the Order' });

      }
      else
        res.status(200).json({ responseMessage: 'Could not update the Order' });
    }
    UpdateOrder();
  }
  catch (error) {
    res.status(500).json({ responseMessage: 'Database not responding' });
  }
});

router.post("/CancelOrder", (req, res) => {
  try {
    CancelOrder = async () => {
      let orderID = req.body.id;

      let r = await ordersDaoObj.deleteOrder(orderID);

      if (result)
        res.status(200).json({ responseMessage: 'Deleted the Order' });
      else
        res.status(200).json({ responseMessage: 'Could not delete the Order' });
    }
    CancelOrder();
  }
  catch (error) {
    res.status(500).json({ responseMessage: 'Database not responding' });
  }
});

router.post("/OrderItem", (req, res) => {
  
  let data = req.body;
   const OrderItem = async () => {
    queryResult = await ordersDaoObj.addnewOrder(data);
    if (queryResult) {
       res.status(200).json({ responseMessage: 'Successfully Created' });
    }
    else {
      res.status(200).json({ responseMessage: 'Could not create the Order' });
    }
  }
  try {
    OrderItem();
  }
  catch (err) {
    res.status(500).json({ responseMessage: 'Database not responding' });
  }

});


module.exports = router;
