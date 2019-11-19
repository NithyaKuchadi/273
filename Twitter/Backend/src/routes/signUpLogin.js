const express = require('express');
const router = express.Router();

var kafka = require('../kafka/client');

router.post("/signup", (req, res) => {
 let signupdata={
    "name":req.body.name,
    "email":req.body.email.toLowerCase().trim(),
    "password": req.body.password,
    "dateofbirth": req.body.dateofbirth,
    "description": req.body.description,
    "created_at": new Date()
}
  kafka.make_request('signupLogin_Topics', { "path": "createNewUser", "body": signupdata }, function (err, result) {
    if (result) {
      res.status(200).json({ responseMessage: 'Successfully Added!' });
    }
  })
});


router.post('/login', function (req, res) {

  let email = req.body.Email.toLowerCase().trim();
  let password = req.body.Password;

  let logindata = {
    "email": email,
    "password": password
  }
  kafka.make_request('signupLogin_Topics', { "path": "login", "body": logindata }, function (err, result) {
   //send 200 for successful login & other status for not success
   if(result)
   {
     res.status(200).json({ responseMessage: 'Successfully Added!' });

   }
  
  })

});

module.exports = router;
