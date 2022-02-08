let db = require("../config/database");

class api{
    static addRefreshToken(token){
        let sql =  `insert into tokens (token) values ("${token}")`;
        return db.execute(sql);
    }

    static getToken(token){
        let sql =  `select * from tokens where token="${token}"`;
        return db.execute(sql);
    }

    static isAuthenticated(user){
        let sql = `select * from users where email="${user.email}" and status=true`
        return db.execute(sql);

    }
}

module.exports = api;