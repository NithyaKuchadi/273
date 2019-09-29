const dBConnection = require('./ConnectionPooling');
module.exports = class LoginSignupDao {
    async updateProfile(userid,updatedData) {
        let con = await dBConnection();
        try {
            await con.query('UPDATE Users SET ? WHERE UserID = ? ', [updatedData,userid]);
            await con.query("COMMIT");
            return true;
          } catch (ex) {
            console.log(ex);
            throw ex;
          } finally {
            await con.release();
            await con.destroy();
          }
        } 
        async updateRestaurant(userid,updatedData) {
          let con = await dBConnection();
          try {
              await con.query('UPDATE Restaurants SET ? WHERE UserID = ? ', [updatedData,userid]);
              await con.query("COMMIT");
              return true;
            } catch (ex) {
              console.log(ex);
              throw ex;
            } finally {
              await con.release();
              await con.destroy();
            }
          }  
        
        
    }
    