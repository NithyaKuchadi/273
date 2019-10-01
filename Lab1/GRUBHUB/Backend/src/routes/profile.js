const express = require('express');
const router = express.Router();
const signUpLoginDao = require("../dao/signUpLoginDao");
const signUpLoginDaoobj = new signUpLoginDao();
const profileDao = require("../dao/profileDao");
const profileDaoObj = new profileDao();
const restaurantDao = require("../dao/restaurantDao");
const restaurantDaoobj = new restaurantDao();
const sha1 = require('sha1');
const multer = require('multer');
var fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/uploads');

  }
  , filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });


router.post('/upload-file', upload.single('photos'), (req, res) => {
  console.log("DID IT COME HERE???? IN UPLOAD FILE");
  console.log('req.body', req.body);
  res.end();
});


router.post('/download-file/:file(*)', (req, res) => {
  console.log('Inside DOwnload File');
  var file = req.params.file;
  var filelocation = path.join('src/uploads/', file);
  var img = fs.readFileSync(filelocation);
  var base64img = new Buffer(img).toString('base64');
  res.writeHead(200, {
    'Content--type': 'image/jpg'
  });
  res.end(base64img);
});

router.post("/getProfileDetails", (req, res) => {
  let email = req.body.Email.toLowerCase().trim();
  let usertype = req.body.UserType;

  FetchingDetails = async () => {
    let result = await signUpLoginDaoobj.checkIfEmailExists(email);
    if (result[0] && usertype === "Owner") {
      
      let userid = result[0].UserID;
      let output = await restaurantDaoobj.getRestaurantDetails(userid);
      let obj;
      if (output[0]) {
        
        obj = {
          RestaurantImage: output[0].RestaurantImage,
          UserName: result[0].UserName,
          Email: result[0].Email,
          PhoneNumber: result[0].PhoneNumber,
          RestName: result[0].RestName,
          Cuisine: output[0].Cuisine,
          ProfileImage: result[0].ProfileImage
        }
      }
      else {
        obj = {
          UserName: result[0].UserName,
          Email: result[0].Email,
          PhoneNumber: result[0].PhoneNumber,
          RestName: result[0].RestName,
          ProfileImage: result[0].ProfileImage,
          Address: result[0].Address
        }

      }
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify(obj));
    }
    else {
      obj = {
        UserName: result[0].UserName,
        Email: result[0].Email,
        PhoneNumber: result[0].PhoneNumber,
        ProfileImage: result[0].ProfileImage,
        Address: result[0].Address
      }
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify(obj));
    }


  }
  try {
    FetchingDetails();
  }
  catch (error) {
    res.status(500).json({ responseMessage: 'Database not responding' });
  }
}
);

router.post("/updateProfile", (req, res) => {
  let email = req.body.Email.toLowerCase().trim();
  let updatedData = {
    "UserName": req.body.Name,
    "Email": req.body.Email,
    "RestaurantName": req.body.RestaurantName,
    "PhoneNumber": req.body.PhoneNumber
  }
  let result = profileDaoObj.updateProfile(email, updatedData);
  if (result) {
    res.status(200).json({ responseMessage: 'Successfully Updated' });

  }
  else {
    res.status(200).json({ responseMessage: 'Could not update' });
  }
});
router.post("/updateEmail", (req, res) => {
  let userid = req.body.UserID;
  let email = req.body.Email.toLowerCase().trim();
  let updatedData = {
    "Email": req.body.Email
  }
  let result = profileDaoObj.updateProfile(userid, updatedData);
  if (result) {
    res.status(200).json({ responseMessage: 'Successfully Updated' });

  }
  else {
    res.status(200).json({ responseMessage: 'Could not update' });
  }
});

router.post("/updateUserName", (req, res) => {
  let userid = req.body.UserID;
  let Name = req.body.Name;
  let updatedData = {
    "UserName": req.body.Name
  }
  let result = profileDaoObj.updateProfile(userid, updatedData);
  if (result) {
    res.status(200).json({ responseMessage: 'Successfully Updated' });

  }
  else {
    res.status(200).json({ responseMessage: 'Could not update' });
  }
});
router.post("/updatePhoneNumber", (req, res) => {
  let userid = req.body.UserID;
  let PhoneNumber = req.body.PhoneNumber;
  let updatedData = {
    "PhoneNumber": PhoneNumber
  }
  let result = profileDaoObj.updateProfile(userid, updatedData);
  if (result) {
    res.status(200).json({ responseMessage: 'Successfully Updated' });

  }
  else {
    res.status(200).json({ responseMessage: 'Could not update' });
  }
});
router.post("/updateAddress", (req, res) => {
  let userid = req.body.UserID;
  let Address = req.body.Address;
  let updatedData = {
    "Address": Address
  }
  let result = profileDaoObj.updateProfile(userid, updatedData);
  if (result) {
    res.status(200).json({ responseMessage: 'Successfully Updated' });

  }
  else {
    res.status(200).json({ responseMessage: 'Could not update' });
  }
});
router.post("/updateRestaurantName", (req, res) => {
  let userid = req.body.UserID;
  let RestaurantName = req.body.RestaurantName;
  let updatedData = {
    "RestaurantName": RestaurantName
  }
  let result = profileDaoObj.updateProfile(userid, updatedData);
  if (result) {
    res.status(200).json({ responseMessage: 'Successfully Updated' });

  }
  else {
    res.status(200).json({ responseMessage: 'Could not update' });
  }
});
router.post("/updateCuisine", (req, res) => {
  let userid = req.body.UserID;
  let Cuisine = req.body.Cuisine;
  let updatedData = {
    "Cuisine": Cuisine
  }
  let result = profileDaoObj.updateProfile(userid, updatedData);
  if (result) {
    res.status(200).json({ responseMessage: 'Successfully Updated' });

  }
  else {
    res.status(200).json({ responseMessage: 'Could not update' });
  }
});
router.post("/updateProfileImage", (req, res) => {
  let userid = req.body.UserID;
  let ProfileImage = req.body.ProfileImage;
  let updatedData = {
    "ProfileImage": ProfileImage
  }
  let result = profileDaoObj.updateProfile(userid, updatedData);
  if (result) {
    res.status(200).json({ responseMessage: 'Successfully Updated' });

  }
  else {
    res.status(200).json({ responseMessage: 'Could not update' });
  }
});
router.post("/updateRestaurantImage", (req, res) => {
  let userid = req.body.UserID;
  let RestaurantImage = req.body.RestaurantImage;
  let updatedData = {
    "RestaurantImage": RestaurantImage
  }
  let result = profileDaoObj.updateRestaurant(userid, updatedData);
  if (result) {
    res.status(200).json({ responseMessage: 'Successfully Updated' });

  }
  else {
    res.status(200).json({ responseMessage: 'Could not update' });
  }
});


module.exports = router;
