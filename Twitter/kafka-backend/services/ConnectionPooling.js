let mysql = require('promise-mysql');

module.exports = async () => {
    try {
        let pool = mysql.createPool({
            connectionLimit: 500,
            host: 'twitter.c4nbsf9ejoyh.us-east-1.rds.amazonaws.com',
            user: 'admin',
            password: 'password123',
            database: "Twitter"
        });
        if (pool) 
        {
        let con = pool.getConnection();
        return con;
        }
    } catch (ex) {
        throw ex;
    }
}