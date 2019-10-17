const dBConnection = require('./ConnectionPooling');
module.exports = class restaurantDao {
    async addRestaurant(restaurantName,userID,zipcode) {
        let con = await dBConnection();
        try {
            let result=await con.query('INSERT INTO Restaurants SET RestaurantName =?, UserID=? , ZipCode=?',[restaurantName,userID,zipcode]);
            await con.query("COMMIT");
            return result;
          } catch (ex) {
            console.log(ex);
            throw ex;
          } finally {
            await con.release();
            await con.destroy();
          }
        }  
        async getRestaurantDetails(userid) {
          let con = await dBConnection();
          try {
              let result=await con.query('SELECT * FROM Restaurants WHERE UserID=?',[userid]);
              await con.query("COMMIT");
             console.log("Restaurant id is dao"+result[0].RestaurantID);
              return result;
            } catch (ex) {
              console.log(ex);
              throw ex;
            } finally {
              await con.release();
              await con.destroy();
            }
          }
          async getRestaurantsOnID(restid) {
            console.log("in rest dao restid is "+restid);
            let con = await dBConnection();
            try {
                let result=await con.query('SELECT * FROM Restaurants WHERE RestaurantID=?',[restid]);
                await con.query("COMMIT");
                console.log("in rest dao"+result);
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
