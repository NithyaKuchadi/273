const express = require('express');
const router = express.Router();

var kafka = require('../kafka/client');

router.post("/getProfileDetails", (req, res) => {
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

module.exports = router;