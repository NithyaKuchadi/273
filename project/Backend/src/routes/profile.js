const express = require('express');
const router = express.Router();
const multer = require('multer');
var fs = require('fs');
var kafka = require('../kafka/client');


router.post('/download-file/',(req, res) => {
  var file = req.body.image.imageUrl;
  console.log("file is "+req.body.image.imageUrl);
  console.log("IN DOWNLOAD,file is "+JSON.stringify(file));
 if(file!=="")
 {
 var base64img = new Buffer(file).toString('base64');
   res.writeHead(200, {
     'Content--type': 'image/jpg'
   });
   res.end(base64img);
 }
 });

router.post("/getProfileDetails", (req, res) => {
console.log("IN GET PROFILE DETAILS BACKEND");
 let data={
    "userid":req.body.userid
}
  kafka.make_request('profile_Topics', { "path": "getProfileDetails", "body": data }, function (err, result) {
    if (result) {
        console.log("RESULT IS "+JSON.stringify(result));
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify(result));
    }
  })
});

router.post("/updateprofile", (req, res) => {
  console.log("IN UPDATE PROFILE", JSON.stringify(req.body));
   let data={
      "userid":req.body.userID,
      "username": req.body.Name,
      "description":req.body.Bio,
      "location":req.body.Location,
      "website_url":req.body.Website,
      "dateofbirth":req.body.BirthDate,
      "profileimage_url":req.body.ProfileImage,
      "coverimage_url":req.body.CoverImage
  }
  console.log("RESULT BEFORE UPDATE IS ",req.body.userID);
    kafka.make_request('profile_Topics', { "path": "updateprofile", "body": data }, function (err, result) {
      if (result) {
          console.log("RESULT UPDATE IS "+JSON.stringify(result));
          res.writeHead(200, { 'content-type': 'application/json' });
          res.end(JSON.stringify(result));
      }
    })
  });

router.post("/updateprofileImage", (req, res) => {
    console.log("IN UPDATE PROFILE IMAGE");
     let data={
        "userid":req.body.userID,
        "profileimage_url":req.body.ProfileImage
    }
    console.log("RESULT BEFORE UPDATE IS ",req.body.userID);
      kafka.make_request('profile_Topics', { "path": "updateprofileImage", "body": data }, function (err, result) {
        if (result) {
            console.log("RESULT UPDATE IS "+JSON.stringify(result));
            res.writeHead(200, { 'content-type': 'application/json' });
            res.end(JSON.stringify(result));
        }
      })
    });
module.exports = router;