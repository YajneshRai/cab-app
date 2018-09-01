const mysql = require('mysql');

class DB {

    constructor(config) {
        this.con = mysql.createConnection(config);
        this.con.connect();
    }

    query(sql, args) {
        return new Promise( (resolve, reject) => {
            this.con.query(sql, args, (err, result) => {
                err ? reject(err) : resolve(result);
            })
        })
    }
}

const connectionObject = { 
    user: 'root',
    password: 'cabapp',
    database: 'cabapp'
};

let connection = new DB(connectionObject);

module.exports = connection;