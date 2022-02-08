const db = require("../config/database");

class admin{
    static getByEmail(email){
        let sql = `select * from admin where email = "${email}"`
        return db.execute(sql)
    }

    static getById(id){
        let sql = `select * from admin where id = ${id}`
        return db.execute(sql);
    }

    static updatePassword(hash,email){
        let sql = `update admin set password="${hash}" where email="${email}"`;
        return db.execute(sql);
    }

    static updateProfile(user){
        let sql = `update admin set firstname = "${user.firstname}",
                                    lastname = "${user.lastname}",
                                    email = "${user.email}",
                                    address = "${user.address}",
                                    city = "${user.city}",
                                    country = "${user.country}"
                                    where id = ${user.id}`
        return db.execute(sql);
    }
}

module.exports = admin;