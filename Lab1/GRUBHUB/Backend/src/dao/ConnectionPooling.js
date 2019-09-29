let mysql = require('promise-mysql');

module.exports = async () => {
    try {
        let pool = mysql.createPool({
            connectionLimit: 10,
            host: 'localhost',
            user: 'root',
            password: 'nithY@123',
            database: "273Project"
        });
        if (pool) 
        {
        let con = pool.getConnection();
        console.log("connection is "+con);
        return con;
        }
    } catch (ex) {
        throw ex;
    }
}