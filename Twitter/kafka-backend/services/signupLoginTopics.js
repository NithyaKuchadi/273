const dBConnection = require('./ConnectionPooling');
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
    console.log("IN LOGIN TOPICS", msg.body.email + "  ------       " + msg.body.usertype);

            console.log("In login");
            let con = await dBConnection();
            console.log("In login"+JSON.stringify(msg));
            con.query('SELECT * from user', async function(err, result) {
                if (result) {
                    await con.query("COMMIT", (err, result) => {
                        if (result) {
                            callback(null, {
                                signupSuccess: true,
                                signupMessage: "Sign Up Success. Sign In to continue!"
                            })
                        }
                    })
                }
        
            });
}
async function createNewUser(msg, callback) {

    console.log("In signup");
    let con = await dBConnection();
    console.log("In signup"+JSON.stringify(msg));
    await con.query('INSERT INTO user SET ?', [msg.body], async (err, result) => {
        if (result) {
            await con.query("COMMIT", (err, result) => {
                if (result) {
                    callback(null, {
                        signupSuccess: true,
                        signupMessage: "Sign Up Success. Sign In to continue!"
                    })
                }
            })
        }

    });
}