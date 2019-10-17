const dBConnection = require('./ConnectionPooling');

module.exports = class LoginSignupDao {
    async login(email,password,type) {
        let con = await dBConnection();
        try {
           
            let result = await con.query('SELECT * FROM Users WHERE email = ? AND password = ? AND UserType =?', [email, password,type]);
            await con.query("COMMIT");
            result = JSON.parse(JSON.stringify(result));
            return result;
          } catch (ex) {
            console.log(ex);
            throw ex;
          } finally {
            await con.release();
            await con.destroy();
          }
        }
    async createNewUser(inputData){
        let con = await dBConnection();
        try {
            await con.query('INSERT INTO Users SET ?', [inputData]);
            await con.query("COMMIT");
            let result = await con.query('SELECT * FROM Users WHERE email = ? AND password = ?', [inputData.Email, inputData.Password]);
            let userid= result[0].UserID;
            
            return userid;
          } catch (ex) {
            await con.query("ROLLBACK");
           throw ex;
          } finally {
            await con.release();
            await con.destroy();
          }
    }

      async checkIfEmailExists(email){
        let con = await dBConnection();
        try {
           let result = await con.query('SELECT * FROM Users WHERE email = ?', [email]);
            await con.query("COMMIT");
            result = JSON.parse(JSON.stringify(result));
           
            return result;
          } catch (ex) {
            throw ex;
          } finally {
            await con.release();
            await con.destroy();
          }
    }
    async getUserDetails(userid){
      let con = await dBConnection();
      try {
          let result = await con.query('SELECT UserName,Address FROM Users WHERE UserID = ?', [userid]);
          await con.query("COMMIT");
           result = JSON.parse(JSON.stringify(result));
          return result;
        } catch (ex) {
          console.log(ex);
          throw ex;
        } finally {
          await con.release();
          await con.destroy();
        }
  }
    }
