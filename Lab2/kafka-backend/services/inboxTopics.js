
const Messages = require('../models/message_schema');
const users = require("../models/user_schema");

exports.inboxService = function inboxService(msg, callback) {
   switch (msg.path) {
       
        case "saveMessage":
            saveMessage(msg, callback);
            break;
        case "getMessages":
            getMessages(msg, callback);
            break;
    }
};



function saveMessage(msg, callback) {
 var msgData = {
        "to": msg.body.to,
        "from": msg.body.from,
        "message": msg.body.message,
        "timestamp": new Date()
    }
    Messages.create(msgData, function (err, message) {
     if(message) {
           callback(null, { status: 200, message });
        }
    });
}


function getMessages(msg, callback) {

    let sortCriteria = { timestamp : 1 };
    Messages.find({ $or: [{ to : msg.email},{ from : msg.email}] }, function (err, results) {
    if (results) {
                callback(null, { status: 200, msgs: results });
            }
            else {
               callback(null, { status: 401 });
            }
        
    }).sort(sortCriteria);
}
