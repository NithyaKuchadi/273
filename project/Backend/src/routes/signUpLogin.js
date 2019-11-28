const express = require('express');
const router = express.Router();
var config = require('../../config/settings');
var kafka = require('../kafka/client');
var jwt = require('jsonwebtoken');
router.post("/signup", (req, res) => {
  let username=req.body.name;
  username=username.split(' ').join('');

 let signupdata={
    "name":username,
    "email":req.body.email.toLowerCase().trim(),
    "password": req.body.password,
    "description": req.body.description,
    "userhandle":  "@"+username,
    "created_at": new Date()
}
  kafka.make_request('signupLogin_Topics', { "path": "createNewUser", "body": signupdata }, function (err, result) {
    if (result) {
      res.status(200).json({ responseMessage: 'Successfully Added!' });
    }
  })
});


router.post('/login', function (req, res) {

  let username=req.body.username;
  username=username.split(' ').join('');
  let password = req.body.password;

  let logindata = {
    "username": username,
    "password": password
  }
  kafka.make_request('signupLogin_Topics', { "path": "login", "body": logindata }, function (err, result) {
   //send 200 for successful login & other status for not success
   console.log("Result is "+JSON.stringify(result.result[0]));
   if(result)
   {
    var token = jwt.sign({ id: result.result[0].userid, username: result.result[0].username }, config.secret_key, {
      expiresIn: 7200
    });
    let cookies = { token: token, cookie1: result.result[0].userid, cookie2: result.result[0].username, cookie3: result.result[0].userhandle };


    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify(cookies));

   }
  else
   {
    res.status(202).json({ responseMessage: 'Cannot Login!' });
   }
  
  })

});

module.exports = router;
