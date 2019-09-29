const dBConnection = require('./ConnectionPooling');
module.exports = class ordersDao {
    async FetchRestaurantID(userID) {
        let con = await dBConnection();
        try { 
            let result= await con.query('SELECT RestaurantID FROM Restaurants WHERE UserID= ?' ,[userID]);
            await con.query("COMMIT");
            return result[0].RestaurantID;
          } catch (ex) {
            console.log(ex);
            throw ex;
          } finally {
            await con.release();
            await con.destroy();
          }
        }  

    async showOrders(resID) {
       let con = await dBConnection();
        try {
            
            let result= await con.query('SELECT * FROM Orders WHERE RestaurantID= ?' ,[resID]);
            await con.query("COMMIT");
            
            return JSON.parse(JSON.stringify(result));
          } catch (ex) {
            console.log(ex);
            throw ex;
          } finally {
            await con.release();
            await con.destroy();
          }
        }  
        async updateOrder(orderID,statusOfOrder) {
            let con = await dBConnection();
            try {
                await con.query('UPDATE Orders SET StatusOfOrder= ? WHERE OrderID = ?',[statusOfOrder,orderID]);
                await con.query("COMMIT");
                return true;
              } catch (ex) {
                
                throw ex;
              } finally {
                await con.release();
                await con.destroy();
              }
            }  
            async deleteOrder(orderID) {
                let con = await dBConnection();
                try {
                    await con.query('DELETE FROM Orders WHERE OrderID = ?',[orderID]);
                    await con.query("COMMIT");
                    return true;
                  } catch (ex) {
                   
                    throw ex;
                  } finally {
                    await con.release();
                    await con.destroy();
                  }
                }  
        

                async addnewOrder(inputData){
                  let con = await dBConnection();
                  try {
                      await con.query('INSERT INTO Orders SET ?', [inputData]);
                      await con.query("COMMIT");
                      return true;
                    } catch (ex) {
                      
                      await con.query("ROLLBACK");
                      
                      throw ex;
                    } finally {
                      await con.release();
                      await con.destroy();
                    }
              }

              async getPastOrders(userID,orderstatus){
                let con = await dBConnection();
                try {
                    let result=await con.query('SELECT * From Orders WHERE usersofid = ? AND StatusOfOrder= ?', [userID,orderstatus]);
                    await con.query("COMMIT");
                    return JSON.parse(JSON.stringify(result));
                  } catch (ex) {
                    await con.query("ROLLBACK");
                    throw ex;
                  } finally {
                    await con.release();
                    await con.destroy();
                  }
            }
            async getUpcomingOrders(userID,orderStatus){
              let con = await dBConnection();
              try {
                  let result=await con.query('SELECT * From Orders WHERE usersofid = ? AND StatusOfOrder= ? OR StatusOfOrder = ?', [userID,orderStatus,"Ready"]);
                  await con.query("COMMIT");
                  return JSON.parse(JSON.stringify(result));
                } catch (ex) {
                  await con.query("ROLLBACK");
                  throw ex;
                } finally {
                  await con.release();
                  await con.destroy();
                }
          }




    }
