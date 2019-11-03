const restaurants = require("../models/restaurant_schema");
const orders = require("../models/order_schema");
const items = require("../models/item_schema");
const users = require("../models/user_schema");
exports.orderService = function orderService(msg, callback) {
     switch (msg.path) {
        case "updateOrder":
            updateOrder(msg, callback);
            break;
        case "showOrders":
            showOrders(msg, callback);
            break;
        case "FetchRestaurantID":
            FetchRestaurantID(msg, callback);
            break;

        case "addnewOrder":
            addnewOrder(msg, callback);
            break;
        case "getPastOrders":
            getPastOrders(msg, callback);
            break;
        case "getUpcomingOrders":
            getUpcomingOrders(msg, callback);
            break;

    }
};
async function showOrders(msg, callback) {
    if (msg.body.order_type === "new") {
        let allorders = await orders.find({ restaurantid: msg.body.resID, $or: [{ statusoforder: "New" }, { statusoforder: "Ready" }] });
        if (allorders) {
            let orders = [];
            for (let i = 0; i < allorders.length; i++) {
                let itemid = allorders[i].itemid;
                let userid = allorders[i].userid;
                let itemname = await items.findOne({ _id: itemid });
                if (itemname) {
                    let j = 0;
                    let userdetails = await users.findOne({ _id: userid });
                    if (userdetails) {
                        let orderdetails = {
                            "OrderID": allorders[i]._id,
                            "PersonName": userdetails.username,
                            "Address": userdetails.address,
                            "Item": itemname.name,
                            "Quantity": allorders[i].quantity,
                            "Price": allorders[i].price,
                            "StatusOfOrder": allorders[i].statusoforder
                        }
                        orders.push(orderdetails);
                    }

                }

            }
            callback(null, orders);
        }}
        else {
            let allorders = await orders.find({ restaurantid: msg.body.resID, $or: [{ statusoforder: "Delivered" }, { statusoforder: "Cancel" }] });
            if (allorders) {
                let orders = [];
                for (let i = 0; i < allorders.length; i++) {
                    let itemid = allorders[i].itemid;
                    let userid = allorders[i].userid;
                    let itemname = await items.findOne({ _id: itemid });
                    if (itemname) {
                        let j = 0;
                        let userdetails = await users.findOne({ _id: userid });
                        if (userdetails) {
                            let orderdetails = {
                                "OrderID": allorders[i]._id,
                                "PersonName": userdetails.username,
                                "Address": userdetails.address,
                                "Item": itemname.name,
                                "Quantity": allorders[i].quantity,
                                "Price": allorders[i].price,
                                "StatusOfOrder": allorders[i].statusoforder
                            }
                            orders.push(orderdetails);
                        }

                    }

                }
                callback(null, orders);
            }

        }

    }
    function updateOrder(msg, callback) {
        orders.findOneAndUpdate({ _id: msg.body.orderID }, { $set: { statusoforder: msg.body.statusOfOrder } }, function (err, res) {
            if (err) {
               callback(err, "unable to read the database");
            } else if (res) {
               callback(null,  res );
            }
        })
    }
    function FetchRestaurantID(msg, callback) {
        restaurants.findOne({ ownerid: msg.userID }, function (err, res) {
            if (err) {
                callback(err, "unable to read the database");
            } else if (res) {
                callback(null, res);
            }
        })
    }

    function addnewOrder(msg, callback) {
        let inputData = {
            itemid: msg.body.itemsofid,
            userid: msg.body.usersofid,
            restaurantid: msg.body.RestaurantID,
            quantity: msg.body.Quantity,
            price: msg.body.Price,
            statusoforder: msg.body.StatusOfOrder
        }
        orders.create(inputData, function (err, res) {
            if (res) {
               callback(null, { status: 200, res });
            }

        });
    }
    async function getPastOrders(msg, callback) {
        let pastOrders = await orders.find({ userid: msg.body.userID, $or: [{ statusoforder: "Delivered" }, { statusoforder: "Cancel" }] });
        if (pastOrders) {
            let getPastOrders = [];

            for (let i = 0; i < pastOrders.length; i++) {
                let restid = pastOrders[i].restaurantid;

                let restaurant = await restaurants.findOne({ _id: restid })
                if (restaurant) {
                    let restaurantName = restaurant.restaurantname;
                    let itemId = pastOrders[i].itemid;

                    let itemDetails = await items.findOne({ _id: itemId })
                    let itemName = itemDetails.name;

                    let obj = {
                        "OrderID": pastOrders[i]._id,
                        "RestaurantName": restaurantName,
                        "NameOfItem": itemName,
                        "Quantity": pastOrders[i].quantity,
                        "Price": pastOrders[i].price,
                        "StatusOfOrder": pastOrders[i].statusoforder
                    }
                    getPastOrders.push(obj);

                }
            }
            callback(null, getPastOrders);
        }

    }
    async function getUpcomingOrders(msg, callback) {
        let upcomingOrders = await orders.find({ userid: msg.userID, $or: [{ statusoforder: "New" }, { statusoforder: "Ready" }] });
     
        if (upcomingOrders) {


            let getUpcomingOrders = [];
            for (let i = 0; i < upcomingOrders.length; i++) {
                let restid = upcomingOrders[i].restaurantid;

                let restaurant = await restaurants.findOne({ _id: restid })
                if (restaurant) {
                    let restaurantName = restaurant.restaurantname;
                    let itemId = upcomingOrders[i].itemid;

                    let itemDetails = await items.findOne({ _id: itemId });
                   let itemName = itemDetails.name;

                    let obj = {
                        "OrderID": upcomingOrders[i]._id,
                        "RestaurantName": restaurantName,
                        "NameOfItem": itemName,
                        "Quantity": upcomingOrders[i].quantity,
                        "Price": upcomingOrders[i].price,
                        "StatusOfOrder": upcomingOrders[i].statusoforder
                    }
                    getUpcomingOrders.push(obj);
                    
                }
            }
            callback(null, getUpcomingOrders);
        }

    }

