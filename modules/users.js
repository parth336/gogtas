const db = require("../config/database");

class user{
    static getByEmail(email){
        let sql = `select * from users where email = "${email}"`
        return db.execute(sql)
    }

    static getById(id){
        let sql = `select * from users where id = ${id}`
        return db.execute(sql);
    }

    static getByInstituteId(id){
        let sql = `select * from users where institute = ${id}`;
        return db.execute(sql);
    }

    static add(user){
        let sql = `insert into users (institute,firstname,lastname,email,status) values (${user.institute},"${user.firstname}","${user.lastname}","${user.email}",true)`;
        return db.execute(sql);
    }

    static chageStatus(id,status){
        let sql = `update users set status = ${status} where id = ${id}`;
        return db.execute(sql);
    }

    static uploadUsers(users,institute){
        let sql = `insert into users (institute, firstname, lastname, email, status) values `
        for(let x=0 ; x<users.length ; x++){
            if(x==0){
                sql += `(${institute},"${users[x].Firstname}","${users[x].Lastname}","${users[x].Email}",true)`;
            }else{
                sql += `,(${institute},"${users[x].Firstname}","${users[x].Lastname}","${users[x].Email}",true)`;
            }
        }
        return db.execute(sql);
    }
}

module.exports = user;