const sections = require("../models/section_schema");
const items = require("../models/item_schema");
const restaurants = require("../models/restaurant_schema");
exports.menuService = function menuService(msg, callback) {
    switch (msg.path) {
        case "addnewItem":
            addnewItem(msg, callback);
            break;
        case "updateItem":
            updateItem(msg, callback);
            break;
        case "deleteItem":
            deleteItem(msg, callback);
            break;
        case "addnewSection":
            addnewSection(msg, callback);
            break;
        case "updateSection":
            updateSection(msg, callback);
            break;
        case "getAllItems":
            getAllItems(msg, callback);
            break;
        case "deleteSection":
            deleteSection(msg, callback);
            break;
        case "getAllSections":
            getAllSections(msg, callback);
            break;
        case "FetchItemName":
            FetchItemName(msg, callback);
            break;
        case "getRestIDS":
            getRestIDS(msg, callback);
            break;
        case "getSectionID":
            getSectionID(msg, callback);
            break;
        case "getItemsBasedOnItemID":
            getItemsBasedOnItemID(msg, callback);
            break;
        case "getSectionsItems":
            getSectionsItems(msg, callback);
            break;
    }
};
function addnewItem(msg, callback) {
    let inputData = {
        "name": msg.body.name,
        "description": msg.body.description,
        "price": msg.body.price,
        "restaurantid": msg.body.restaurantid,
        "sectionid": msg.body.sectionid,
        "itemimage": msg.body.itemimage
    }
    items.create(inputData, function (err, res1) {
        if (res1) {
            items.find({ restaurantid: msg.body.restaurantid, sectionid: msg.body.sectionid }, async function (err, res) {
                if (res) {
                   callback(null, res);
                }
            })
        }
    })
}
function updateItem(msg, callback) {
    let itemdata = {
        "name": msg.body.name,
        "description": msg.body.description,
        "price": msg.body.price,
        "itemimage": msg.body.itemimage
    }
   items.findOneAndUpdate({ _id: msg.itemid, restaurantid: msg.restaurantid }, { $set: itemdata }, function (err, res) {
        if (res) {
            callback(null, res);
        }
    })
}
function deleteItem(msg, callback) {
    items.deleteOne({ _id: msg.itemid }, function (err, res1) {
        if (res1) {
            callback(null, res1);
        }
    })

}
function addnewSection(msg, callback) {
    let inputData = {
        "sectionname": msg.body.sectionname,
        "restaurantid": msg.body.restaurantid

    }
    sections.create(inputData, function (err, res) {
        if (!err) {
            sections.find({ restaurantid: msg.body.restaurantid }, function (err, res) {
                if (err) {
                   callback(err, "unable to read the database");
                } else if (res) {
                    callback(null, res);
                }
            })
        }
    })
}
function updateSection(msg, callback) {
    sections.findOneAndUpdate({ _id: msg.sectionID }, { $set: { sectionname: msg.sectionName } }, function (err, res) {
        if (!err) {
            sections.find({ restaurantid: msg.restid }, function (err, res) {
                if (err) {
                   callback(err, "unable to read the database");
                } else if (res) {
                    callback(null, res);
                }
            })
        }


    })

}
function getAllItems(msg, callback) {
    items.find({ restaurantid: msg.RestaurantID, sectionid: msg.sectionID }, function (err, res) {
        if (err) {
           callback(err, "unable to read the database");
        } else if (res) {
           callback(null, res);
        }
    })
}
function deleteSection(msg, callback) {
    sections.deleteOne({ restaurantid: msg.RestaurantID, _id: msg.sectionid }, function (err, res1) {
        if (res1) {
            sections.find({ restaurantid: msg.RestaurantID }, function (err, res) {
                if (err) {
                    callback(err, "unable to read the database");
                } else if (res) {
                    callback(null, res);
                }
            })
        }
    })
}
function getAllSections(msg, callback) {
    sections.find({ restaurantid: msg.RestaurantID }, function (err, res) {
        if (err) {
            callback(err, "unable to read the database");
        } else if (res) {
           callback(null, res);
        }
    })
}
async function getSectionsItems(msg, callback) {
    let result = await sections.find({ restaurantid: msg.RestaurantID });
    if (result) {
        let itemdatalist = [];
        for (let i = 0; i < result.length; i++) {
            let sectionID = result[i]._id;
            let sectionName = result[i].sectionname;
            let items1 = await items.find({ restaurantid: msg.RestaurantID, sectionid: sectionID });
            if (items1) {
                let itemsarr = [];
                for (let j = 0; j < items1.length; j++) {
                    let item = {
                        "ItemID": items1[j]._id,
                        "NameOfItem": items1[j].name,
                        "DescriptionOfItem": items1[j].description,
                        "PriceOfItem": items1[j].price,
                        "ItemImage": items1[j].itemimage
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
          
        }
        callback(null, itemdatalist);

    }

}
function FetchItemName(msg, callback) {
    items.findOne({ _id: msg.itemid }, function (err, res) {
        if (err) {
            callback(err, "unable to read the database");
        } else if (res) {
            callback(null, res);
        }
    })
}
async function getRestIDS(msg, callback) {
    let result = await items.find({ name: msg.body.itemName });
    if (result) {
        let restNames = [];
        for (let i = 0; i < result.length; i++) {
            let restid = result[i].restaurantid;
            let output = await restaurants.findOne({ _id: restid });
            if (output) {
               restNames.push(output);
               
            }



        }
       callback(null, restNames);
    }
}
function getSectionID(msg, callback) {
    sections.findOne({ restaurantid: msg.body.RestaurantID, sectionname: msg.body.SectionName }, function (err, res) {
        if (err) {
            callback(err, "unable to read the database");
        } else if (res) {
            callback(null, res);
        }
    })
}
function getItemsBasedOnItemID(msg, callback) {
    items.findOne({ _id: msg.itemID }, function (err, res) {
        if (err) {
            callback(err, "unable to read the database");
        } else if (res) {
           callback(null, res);
        }
    })

}
