const express = require('express');
const router = express.Router();
const sha1 = require('sha1');

const signUpLoginDao = require("../dao/signUpLoginDao");
const signUpLoginDaoobj = new signUpLoginDao();
const restaurantDao = require("../dao/restaurantDao");
const restaurantDaoobj = new restaurantDao();
router.post("/Ownersignup", (req, res) => {
  let userName = req.body.Name;
  let email = req.body.Email.toLowerCase().trim();
  let encryptedPassword = sha1(req.body.Password);
  let restaurantName = req.body.RestaurantName;
  let phoneNumber = req.body.PhoneNumber;
  let address = req.body.Address;
  let zipcode = req.body.ZipCode;
  console.log(userName, email, encryptedPassword, restaurantName, phoneNumber, address);

  var queryResult = [];
  const createUserIfNotPresent = async () => {
    queryResult = await signUpLoginDaoobj.checkIfEmailExists(email);
    if (queryResult[0]) {
      if (queryResult[0] != null) {
        console.log("user already exists");
        res.status(200).json({ responseMessage: 'User already exists' });
      }
    }
    else {
      let signUpData = {
        "UserName": userName,
        "Email": email,
        "Password": encryptedPassword,
        "RestName": restaurantName,
        "UserType": "Owner",
        "PhoneNumber": phoneNumber,
        "Address": address
      }
      console.log("created data");
      let id = await signUpLoginDaoobj.createNewUser(signUpData);
      result = await restaurantDaoobj.addRestaurant(restaurantName, id, zipcode);
      console.log("Successfully created");
      res.status(200).json({ responseMessage: 'Successfully Created' });
    }
  }
  try {
    createUserIfNotPresent();
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ responseMessage: 'Database not responding' });
  }

});

router.post("/Buyersignup", (req, res) => {
  let userName = req.body.UserName;
  let email = req.body.Email.toLowerCase().trim();
  let encryptedPassword = sha1(req.body.Password);
  var queryResult = [];
  const createUserIfNotPresent = async () => {
    queryResult = await signUpLoginDaoobj.checkIfEmailExists(email);
    if (queryResult[0]) {
      if (queryResult[0] != null) {
        console.log("user already exists");
        res.status(200).json({ responseMessage: 'User already exists' });
      }
    }
    else {
      let signUpData = {
        "UserName": userName,
        "Email": email,
        "Password": encryptedPassword,
        "UserType": "Buyer"
      }
      console.log("created data");
      let id = await signUpLoginDaoobj.createNewUser(signUpData);
      console.log("Successfully created");
      res.status(200).json({ responseMessage: 'Successfully Created' });
    }
  }
  try {
    createUserIfNotPresent();
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ responseMessage: 'Database not responding' });
  }

});
router.post('/Ownerlogin', function (req, res) {
  console.log("is it cumng here??? owner login");
  let type = req.body.Type;
  let Email = req.body.Email.toLowerCase().trim();
  let Password = sha1(req.body.Password);
  console.log("Email,Password is" + Email + "," + Password);
  let queryResult = [];
  const checkuser = async () => {
    queryResult = await signUpLoginDaoobj.login(Email, Password, type);
    console.log(queryResult);

    if (!queryResult[0]) {
      console.log("invalid user");
      res.status(202).json({ validUser: false });
    } else {
      if (queryResult[0].UserName != null) {
        console.log("User exists! Valid credentials");
        res.cookie('cookie1', "Owner", { maxAge: 900000, httpOnly: false, path: '/' });
        res.cookie('cookie2', queryResult[0].UserID, { maxAge: 900000, httpOnly: false, path: '/' });
        res.cookie('cookie3', Email, { maxAge: 900000, httpOnly: false, path: '/' });
        console.log("Added cookies");
        req.session.UserID = queryResult[0].UserID;
        req.session.Email = Email;
        req.session.userType = "Owner";
        res.status(200).json({ validUser: true });
      }
    }
  }
  try {
    checkuser();
  }
  catch (err) {
    console.log("unable to read the database");
    res.status(500).json({ responseMessage: 'Database not responding' });
  }
});

router.post('/buyerLogin', function (req, res) {
  let type = req.body.Type;
  let Email = req.body.Email.toLowerCase().trim();
  let Password = sha1(req.body.Password);
  console.log("Email,Password is" + Email + "," + Password);
  let queryResult = [];
  const checkuser = async () => {
    queryResult = await signUpLoginDaoobj.login(Email, Password, type);
    console.log(queryResult);

    if (!queryResult[0]) {
      console.log("invalid user");
      res.status(202).json({ validUser: false });
    } else {
      if (queryResult[0].UserName != null) {
        console.log("User exists! Valid credentials");
        res.cookie('cookie1', "Buyer", { maxAge: 900000, httpOnly: false, path: '/' });
        res.cookie('cookie2', queryResult[0].UserID, { maxAge: 900000, httpOnly: false, path: '/' });
        res.cookie('cookie3', Email, { maxAge: 900000, httpOnly: false, path: '/' });
        console.log("Added cookies");
        req.session.UserID = queryResult[0].UserID;
        req.session.Email = Email;
        req.session.userType = "Buyer";
        res.status(200).json({ validUser: true });
      }
    }
  }
  try {
    checkuser();
  }
  catch (err) {
    console.log("unable to read the database");
    res.status(500).json({ responseMessage: 'Database not responding' });
  }
});

router.get('/signOut', function (req, res) {
  res.clearCookie('cookie');
  req.session.user = undefined;
  res.writeHead(200, {
    'Content-type': 'text/plain'
  });
  res.end('Back to login!');

});


module.exports = router;
