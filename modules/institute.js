const db = require("../config/database");

class institute{
    static getByDomain(domain){
        let sql = `select * from institutes where domain = "${domain}"`
        return db.execute(sql)
    }

    static getById(id){
        let sql = `select * from institutes where id = ${id}`
        return db.execute(sql);
    }
    static getAll(){
        let sql = `select * from institutes`
        return db.execute(sql);
    }
    static add(institute){
        let sql = `insert into institutes (firstname
                                            ,lastname
                                            ,institute_name
                                            ,domain,email
                                            ,city
                                            ,state
                                            ,address1
                                            ,address2
                                            ,zipcode
                                            ,country
                                            ,status) values 
                                            ("${institute.firstname}"
                                            ,"${institute.lastname}"
                                            , "${institute.instituteName}"
                                            ,"${institute.domain}"
                                            , "${institute.email}"
                                            , "${institute.city}"
                                            , "${institute.state}"
                                            , "${institute.address1}"
                                            , "${institute.address2}"
                                            , "${institute.zipcode}"
                                            , "${institute.country}"
                                            ,true)`
        return db.execute(sql);
    }

    static update(institute, id){
        let sql = `update institutes set firstname = "${institute.firstname}"
                                        ,lastname = "${institute.lastname}"
                                        ,institute_name = "${institute.instituteName}"
                                        ,domain = "${institute.domain}"
                                        ,email = "${institute.email}"
                                        ,city = "${institute.city}"
                                        ,state = "${institute.state}"
                                        ,address1 = "${institute.address1}"
                                        ,address2 = "${institute.address2}"
                                        ,zipcode = "${institute.zipcode}"
                                        ,country = "${institute.country}"
                                        where id=${id} `
        return db.execute(sql);


    }

    static delete(id){
        let sql = `delete from institutes where id=${id}`
        db.execute(sql);
    }

    static changeStatus(id,status){
        let sql = `update institutes set status = ${status} where id=${id}`;
        db.execute(sql);
    }
}

module.exports = institute;