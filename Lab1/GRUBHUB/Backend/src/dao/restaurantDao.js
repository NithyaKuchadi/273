const dBConnection = require('./ConnectionPooling');
module.exports = class restaurantDao {
    async addRestaurant(restaurantName,userID,zipcode) {
        let con = await dBConnection();
        try {
            let result=await con.query('INSERT INTO Restaurants SET RestaurantName =?, UserID=? , ZipCode=?',[restaurantName,userID,zipcode]);
            await con.query("COMMIT");
            return result;
          } catch (ex) {
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
              let id=result[0].RestaurantID;
              return id;
            } catch (ex) {
             throw ex;
            } finally {
              await con.release();
              await con.destroy();
            }
          }
          async getRestaurantsOnID(restid) {
            let con = await dBConnection();
            try {
                let result=await con.query('SELECT * FROM Restaurants WHERE RestaurantID=?',[restid]);
                await con.query("COMMIT");
                return result;
              } catch (ex) {
               throw ex;
              } finally {
                await con.release();
                await con.destroy();
              }
            }  
          
    }
