const db = require('../util/database');

module.exports = class User{

    constructor(name,password){
        this.name = name,
        this.password = password
    }


    static find(name){
        return db.execute(
            'SELECT * FROM users WHERE name = ?',[name]
        )
    }

    static save(user){
        return db.execute(
            'INSERT INTO users (name,password) values (?,?)',[user.name,user.password]
        )
    }
}

