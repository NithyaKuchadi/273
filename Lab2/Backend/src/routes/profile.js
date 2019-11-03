const express = require('express');
const router = express.Router();
var config = require('../../config/settings');
var kafka = require('../kafka/client');
const sha1 = require('sha1');
const multer = require('multer');
var fs = require('fs');
const path = require('path');
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', { session: false });

//Storing documents/Images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/uploads');
  }
  , filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

//uplaod-file 

router.post('/upload-file',upload.single('photos'), requireAuth,(req, res) => {
  console.log(" IN UPLOAD FILE");
  console.log('req.body', req.body);
  res.status(200);
});

//download-file

router.post('/download-file/:file(*)',requireAuth,(req, res) => {
  console.log('Inside DOwnload File');
  var file = req.body.image;
  console.log("file is "+file);
if(file!=="")
{
  var filelocation = path.join('src/uploads/', file);
  var img = fs.readFileSync(filelocation);
  var base64img = new Buffer(img).toString('base64');
  res.writeHead(200, {
    'Content--type': 'image/jpg'
  });
  res.end(base64img);
}
});

router.post("/getProfileDetails", requireAuth,(req, res) => {
  let email = req.body.Email.toLowerCase().trim();
  let usertype = req.body.UserType;
  let obj;
  console.log("Outside CheckIFEmailExists");
  kafka.make_request('signupLogin_Topics', { "path": "checkIfEmailExists", "email": email }, function (err, result) {
  if (result) {
    console.log("Outside CheckIFEmailExists");
    if(usertype==="Owner")
    {
     kafka.make_request('restaurant_Topics', { "path": "getRestaurantDetails", "userid": result._id }, function (err, output) {
      
          if (output) {
            obj = {
              RestaurantImage: output.res.restaurantimage,
              UserName: result.username,
              Email: result.email,
              PhoneNumber: result.phonenumber,
              Cuisine: output.res.cuisine,
              RestName: output.res.restaurantname,
              ProfileImage: result.profileimage
            }
           res.writeHead(200, { 'content-type': 'application/json' });
            res.end(JSON.stringify(obj));
          }
        
      })
    }
    else{
     obj = {
        UserName: result.username,
        Email: result.email,
        PhoneNumber: result.phonenumber,
        ProfileImage: result.profileimage,
        Address: result.address
      }
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify(obj));
    }
  }
  })
});

router.post("/updateOwnerProfile", requireAuth,(req, res) => {
  let userid = req.body.UserID;
  let email = req.body.Email.toLowerCase().trim();
  
  let updatedData = {
    "email": email,
    "userid": userid,
    "phonenumber": req.body.PhoneNumber,
    "restaurantname": req.body.RestaurantName,
    "cuisine": req.body.Cuisine,
    "profileimage": req.body.ProfileImage,
    "restaurantimage": req.body.RestaurantImage,
    "username": req.body.Name
  }
  kafka.make_request('profile_Topics', { "path": "updateProfile", "body": updatedData }, function (err, output) {
     if (output) {
     kafka.make_request('profile_Topics', { "path": "updateRestaurant", "body": updatedData }, function (err, result) {
        if (result) {
         res.status(200).json({ responseMessage: 'Successfully Updated' });
        }
      })
    }
  })
})
router.post("/updateBuyerProfile",requireAuth, (req, res) => {

  let email = req.body.Email.toLowerCase().trim();
  let updatedData = {
    "email": email,
    "userid": req.body.UserID,
    "phonenumber": req.body.PhoneNumber,
    "profileimage": req.body.ProfileImage,
    "address": req.body.Address,
    "username": req.body.Name
  }
  kafka.make_request('profile_Topics', { "path": "updateProfile", "body": updatedData }, function (err, output) {
    if (err) {
     res.status(500).json({ responseMessage: 'Database not responding' });
    } else if (output) {

      res.status(200).json({ responseMessage: 'Successfully Updated' });
    }
  })

})


module.exports = router;
