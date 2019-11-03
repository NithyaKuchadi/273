const users = require("../models/user_schema");
var crypt = require('../models/bcrypt.js');
exports.signupLoginService = function signupLoginService(msg, callback) {
   switch (msg.path) {
        case "createNewUser":
            createNewUser(msg, callback);
            break;
        case "login":
            login(msg, callback);
            break;
        case "checkIfEmailExists":
            checkIfEmailExists(msg, callback);
            break;
        case "getUserDetails":
            getUserDetails(msg, callback);
            break;
    }
};
function login(msg, callback) {

 users.findOne({ email: msg.body.email, usertype: msg.body.usertype }, function (err, res) {
     if(res)
        {
            console.log("creating password:"+msg.body.password+">>>>>>>>>"+res.password);
          
            crypt.compareHash(msg.body.password, res.password, function (err, isMatch) {
                if (isMatch && !err) {
                    console.log("Login Successful");
                    callback(null, res);
                    console.log("creating token");
                } else {
                    console.log("Authentication failed. Passwords did not match");
                    callback(null, {status: 400});
                }
            })
       
        }
        
    });
}
function createNewUser(msg, callback) {
    crypt.createHash(msg.body.password, function (response) {
    
        enPassword = response;
        console.log("The password is "+enPassword);
    let inputData = {
        "username": msg.body.username,
        "email": msg.body.email,
        "password": enPassword,
        "usertype": msg.body.usertype
    }

    users.create(inputData, function (err, res) {
        if (!err) {
             users.findOne({ email: inputData.email, usertype: inputData.usertype },  function (err, res) {
                if (err) {
                    callback(err, "unable to read the database");
                } else if (res) {
                   callback(null, { status: 200, res });
                }
            });
        }
    })
})
}
function checkIfEmailExists(msg, callback) {
 users.findOne({ email: msg.email }, function (err, res) {
     if (res) {
            callback(null,  res);
        }
       
      })
}
function getUserDetails(msg, callback) {

     users.findOne({ _id: msg.userid }, function (err, res) {
        if (err) {
            callback(err, "unable to read the database");
        } else if (res) {
           callback(null, { status: 200, res });
        }
      })
}