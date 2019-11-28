const { redisClient } = require('../redisClient');
const dBConnection = require('./ConnectionPooling');
//const dBConnection = require('./WithoutConnectionPooling.js');

exports.profileService = function profileService(msg, callback) {
    switch (msg.path) {
        case "getProfileDetails":
            getProfileDetails(msg, callback);
            break;
        case "updateprofile":
            updateprofile(msg, callback);
            break;
        case "updateprofileImage":
                updateprofileImage(msg, callback);
                break;
    }
};

async function getProfileDetailsvthcaching(msg, callback) {
    let con = await dBConnection();
    let result = {};
    let redisKey = "applicantProfile_" + msg.body.userid;
    redisClient.get(redisKey, async function (err, profile) {
        if (!err && profile != null) {
            console.log("Data found in cache");
            profile = JSON.parse(profile);
            result = profile;
            callback(null, { status: 200, result });
        }
        else {
            console.log("Data not found in cache");
            con.query('SELECT * from user WHERE userid=? ', [msg.body.userid], async function (err, profile) {
                if (profile) {
                    con.query("COMMIT", (err, commit) => {
                        if (commit) {
                            console.log("Setting data in cache");
                            redisClient.set(redisKey, JSON.stringify(profile[0]), function (error, reply) {
                                if (error) {
                                    console.log(error);
                                }
                            });
                            result = profile[0];
                            console.log("profile data is ", result);
                            redisClient.expire(redisKey, 3000000);
                            callback(null, { status: 200, result });
                        }
                    })
                }
            })

        }

    })
}
async function getProfileDetails(msg, callback) {
    let con = await dBConnection();
    console.log("msg is  " + msg.body.userid);
    const signUpQuery = "SELECT * from user WHERE userid=?"

    con.query(signUpQuery, [msg.body.userid], function (err, profile) {
        if (profile) {
            con.query("COMMIT", (err, commit) => {
                if (commit) {
                    callback(null, { status: 200, profile });
                }
            })
        }
    })

}
async function updateprofile(msg, callback) {
    let con = await dBConnection();
    console.log("IN UPDATE PROFILE KAFKA BACKEND", msg.body.userid, msg.body.profileimage_url);

    const updateQuery = "UPDATE user SET coverimage_url= ?, website_url=?, description=?,profileimage_url = ?, location =? WHERE userid = ?"

    con.query(updateQuery, [msg.body.coverimage_url, msg.body.website_url,msg.body.description, msg.body.profileimage_url,msg.body.location, msg.body.userid], async function (err, profile) {
        if (profile) {
            console.log("IN UPDATE PROFILE KAFKA BACKEND RESPONSE");
            con.query("COMMIT", (err, commit) => {
                if (commit) {
                   
                    const signUpQuery = "SELECT * from user WHERE userid=?"

                    con.query(signUpQuery, [msg.body.userid], function (err, profiledetails) {
                        if (profiledetails) {
                          console.log("profile data is ", profiledetails);
                          callback(null, { status: 200, profiledetails });
                              
                        }
                    })
                   
                }
            })
        }
    })
}
async function updateprofileImage(msg, callback) {
    let con = await dBConnection();
    
    console.log("IN UPDATE PROFILE KAFKA BACKEND", msg.body.userid, msg.body.profileimage_url);

    const updateQuery = "UPDATE user SET profileimage_url = ? WHERE userid = ?"

    con.query(updateQuery, [ msg.body.profileimage_url, msg.body.userid], async function (err, profile) {
        if (profile) {
            console.log("IN UPDATE PROFILE KAFKA BACKEND RESPONSE");
            con.query("COMMIT", (err, commit) => {
                if (commit) {
                   
                    const signUpQuery = "SELECT * from user WHERE userid=?"

                    con.query(signUpQuery, [msg.body.userid], function (err, profiledetails) {
                        if (profiledetails) {
                          console.log("profile data is ", profiledetails);
                          callback(null, { status: 200, profiledetails });
                              
                        }
                    })
                   
                }
            })
        }
    })
}