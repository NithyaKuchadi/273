const mongoose = require('mongoose')
const config = require('../config/settings');

var connection;
if (true) {
    connection = mongoose.createConnection(config.msgdatabase, {
    useNewUrlParser: true,
    server: { poolSize: 100 }
    });

    connection.on("connected", () => {
    console.log("msg  connection connected");
    });

    connection.on("disconnected", () => {
    console.log("msg  connection disconnected");
    });
}

MessageSchema = new mongoose.Schema({
  from: {
    type: String,
    default: ''
  },
  to: {
    type: String,
    default: ''
  },
  timestamp: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    default: ''
  }
 
});
    

var exported;
if (true) {
    exported = connection.model("Messages", MessageSchema);
} 
module.exports = exported;
