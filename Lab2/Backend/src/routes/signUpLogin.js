const express = require('express');
const router = express.Router();


var config = require('../../config/settings');
var kafka = require('../kafka/client');

var jwt = require('jsonwebtoken');

router.post("/Ownersignup", (req, res) => {

  let userName = req.body.Name;
  let email = req.body.Email.toLowerCase().trim();
  let Password = req.body.Password;
  let restaurantName = req.body.RestaurantName;
  let phoneNumber = req.body.PhoneNumber;
  let address = req.body.Address;
  let zipcode = req.body.ZipCode;


  let signUpData = {
    "username": userName,
    "email": email,
    "password": Password,
    "usertype": "Owner",
    "phonenumber": phoneNumber,
    "address": address
  }

  kafka.make_request('signupLogin_Topics', { "path": "createNewUser", "body": signUpData }, function (err, result) {
    if (result) {
      let restaurantData = {
        "restaurantname": restaurantName,
        "zipcode": zipcode,
        "userID": result.res._id
      }
      kafka.make_request('restaurant_Topics', { "path": "addRestaurant", "body": restaurantData }, function (err, restaurant) {
        if (restaurant) {
          res.status(200).json({ responseMessage: 'Successfully Added!' });
        }
      })
    }
  })


});

router.post("/Buyersignup", (req, res) => {

  let userName = req.body.UserName;
  let email = req.body.Email.toLowerCase().trim();
  let Password = req.body.Password;

  let signUpData = {
    "username": userName,
    "email": email,
    "password": Password,
    "usertype": "Buyer"
  }

  kafka.make_request('signupLogin_Topics', { "path": "createNewUser", "body": signUpData }, function (err, result) {
    if (!err) {
      res.status(200).json({ responseMessage: 'Successfully Added!' });
    }
  })


})
router.post('/Ownerlogin', function (req, res) {
  let usertype = "Owner";
  let email = req.body.Email.toLowerCase().trim();
  let password = req.body.Password;

  let logindata = {
    "email": email,
    "usertype": usertype,
    "password": password
  }

  kafka.make_request('signupLogin_Topics', { "path": "login", "body": logindata }, function (err, result) {
    if (result) {
      var token = jwt.sign({ id: result._id, email: result.email }, config.secret_key, {
        expiresIn: 7200
      });
      let cookies = { token: token, cookie1: "Owner", cookie2: result._id, cookie3: result.email };

      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify(cookies));
    }
  })

});

router.post('/buyerLogin', function (req, res) {
  let usertype = req.body.Type;
  let email = req.body.Email.toLowerCase().trim();
  let password = req.body.Password;

  let logindata = {
    "email": email,
    "usertype": usertype,
    "password": password
  }
  kafka.make_request('signupLogin_Topics', { "path": "login", "body": logindata }, function (err, result) {
    if (result) {
      console.log("login result is" + result._id, +"       (((((((((" + result.email);

      jwt.sign({ id: result._id, email: result.email }, config.secret_key, (err, token) => {
        let cookies = { token: token, cookie1: "Buyer", cookie2: result._id, cookie3: result.email };

        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify(cookies));
      })
    }



  })

});




module.exports = router;
