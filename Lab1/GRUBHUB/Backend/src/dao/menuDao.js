const dBConnection = require('./ConnectionPooling');
module.exports = class menuDao {
    async addnewItem(inputData){
        let con = await dBConnection();
        try {
            let savedUser = await con.query('INSERT INTO Items SET ?', [inputData]);
            await con.query("COMMIT");
            return true;
          } catch (ex) {
            console.log(ex);
            await con.query("ROLLBACK");
            console.log(ex);
            throw ex;
          } finally {
            await con.release();
            await con.destroy();
          }
    }

    async updateItem(RestaurantID,itemid,itemdata) {
        let con = await dBConnection();
        try {
            await con.query('UPDATE Items SET ? WHERE idofrest = ? AND ItemID = ?' ,[itemdata,RestaurantID,itemid]);
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

        async deleteItem(itemid) {
            let con = await dBConnection();
            try {
              console.log("ITem id in dao is"+itemid);
                await con.query('DELETE FROM Items WHERE ItemID= ? ',[itemid]);
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
            
            async addnewSection(inputData){
                let con = await dBConnection();
                try {
                    await con.query('INSERT INTO Sections SET ?', [inputData]);
                    await con.query("COMMIT");
                    let sectionID=await con.query('SELECT SectionID FROM Sections WHERE ?', [inputData]);
                    console.log("Section id      %%%%%%%%%%%%" +sectionID);
                    await con.query("COMMIT");
                    return sectionID;
                  } catch (ex) {
                    console.log(ex);
                    await con.query("ROLLBACK");
                    console.log(ex);
                    throw ex;
                  } finally {
                    await con.release();
                    await con.destroy();
                  }
            }
        
            async updateSection(sectionName,sectionID) {
                let con = await dBConnection();
                try {
                    await con.query('UPDATE Sections SET SectionName= ? WHERE SectionID= ?' ,[sectionName,sectionID]);
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
                async getAllSections(RestaurantID) {
                  let con = await dBConnection();
                  try {
                    let result=  await con.query('SELECT SectionID,SectionName FROM Sections WHERE idOfRestaurant= ?' ,[RestaurantID]);
                      await con.query("COMMIT");
                      console.log("in dao "+result[0]);
                     return  JSON.parse(JSON.stringify(result));
                    } catch (ex) {
                      console.log(ex);
                      throw ex;
                    } finally {
                      await con.release();
                      await con.destroy();
                    }
                  }   
                  async getAllItems(RestaurantID,sectionID) {
                    let con = await dBConnection();
                    try {
                      let result=  await con.query('SELECT * FROM Items WHERE idofrest= ? AND sectID= ?' ,[RestaurantID,sectionID]);
                        await con.query("COMMIT");
                       return  JSON.parse(JSON.stringify(result));
                      } catch (ex) {
                        console.log(ex);
                        throw ex;
                      } finally {
                        await con.release();
                        await con.destroy();
                      }
                    }   
            async deleteSection(RestaurantID,sectionid) {
                let con = await dBConnection();
                try {
                    await con.query('DELETE FROM Sections WHERE idOfRestaurant = ? AND SectionID= ? ',[RestaurantID, sectionid]);
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
                async FetchItemName(itemid) {
                  let con = await dBConnection();
                  try {
                    let result=  await con.query('SELECT NameOfItem FROM Items WHERE ItemID= ?' ,[itemid]);
                      await con.query("COMMIT");
                     return  result[0].NameOfItem;
                    } catch (ex) {
                      console.log(ex);
                      throw ex;
                    } finally {
                      await con.release();
                      await con.destroy();
                    }
                  }  

                  async getRestIDS(itemName) {
                    let con = await dBConnection();
                    try {
                      console.log("Item name is "+itemName);
                      let result=  await con.query('SELECT * FROM Items WHERE NameOfItem= ?' ,[itemName]);
                        await con.query("COMMIT");
                       return  result;
                      } catch (ex) {
                       
                        throw ex;
                      } finally {
                        await con.release();
                        await con.destroy();
                      }
                    }  
    
    async getItemsBasedOnItemID(itemID) {
      let con = await dBConnection();
      try {
        let result=  await con.query('SELECT * FROM Items WHERE ItemID= ?' ,[itemID]);
          await con.query("COMMIT");
         return  JSON.parse(JSON.stringify(result));
        } catch (ex) {
          console.log(ex);
          throw ex;
        } finally {
          await con.release();
          await con.destroy();
        }
      }   

    }