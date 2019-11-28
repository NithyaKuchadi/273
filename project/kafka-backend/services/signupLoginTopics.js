const dBConnection = require('./ConnectionPooling');
const follower = require("../models/follower_schema");
const following = require("../models/following_schema");
const bookmark = require("../models/bookmark_schema");
var crypt = require('../models/bcrypt.js');

exports.signupLoginService = function signupLoginService(msg, callback) {
    switch (msg.path) {
        case "createNewUser":
            createNewUser(msg, callback);
            break;
        case "login":
            login(msg, callback);
            break;
    }
};
async function login(msg, callback) {

    let con = await dBConnection();
    con.query('SELECT * from user WHERE username = ?',[msg.body.username], function (err, result) {
        if (result[0]) {
         
            crypt.compareHash(msg.body.password, result[0].password, function (err, isMatch) {
                if (isMatch && !err) {
                    console.log("login successful,passwords matched"+result[0]);
                    console.log("creating token");
                    callback(null, {result})
                }
                else
                {
                    console.log("passwords did not match");
                    callback({status:202});
                }
            })
        }
    });
}
async function createNewUser(msg, callback) {

    crypt.createHash(msg.body.password, async function (encryptedpassword) {
        let password=encryptedpassword;
    console.log("In signup"+password);

    let con = await dBConnection();
    console.log("In signup" + JSON.stringify(msg.body));
    con.query('INSERT INTO user(username, email, password, description, userhandle,created_at) VALUES(?,?,?,?,?,CURDATE())', [msg.body.name, msg.body.email, password, msg.body.description, msg.body.userhandle], async (err, result) => {
        if (result) {
            console.log("after inserting the result is " + result);
            con.query("COMMIT", (err, result1) => {
                if (result1) {
                    con.query('SELECT userid FROM user WHERE username=?', [msg.body.name], async (err, userid) => {
                        if (userid) {
                            console.log("the result user id is " + userid[0].userid);
                            let inputData = {
                                "userId": userid[0].userid
                            }
                            bookmark.create(inputData, function (err, bookmarkcreate) {
                                if (bookmarkcreate) {
                                    console.log("bookmark create is "+bookmarkcreate);

                                    let followingData = {
                                        "userId": userid[0].userid,
                                        "follows":[],
                                        "followingCount":0
                                    }
                            following.create(followingData, function (err, followingcreate) {
                                        if (followingcreate) {
                                            console.log("followingcreate is "+followingcreate);
                                            let followerData = {
                                                "userId": userid[0].userid,
                                                "followers":[],
                                                "followersCount":0
                                            }
                            follower.create(followerData, function (err, followercreate) {
                                                if (followercreate) {
                                                    console.log("did it come for commit's result1" + followercreate);
                                                    callback(null, {
                                                        signupSuccess: true,
                                                        signupMessage: "Sign Up Success. Sign In to continue!"
                                                    })

                                                }

                                            })
                                        }
                                    })

                                }
                            })
                        }
                    })
                }
            })
        }
    })
})
}


