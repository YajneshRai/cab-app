const mysql = require('mysql');
const DB_PASSWD = process.env.DB_PASSWD || '';

class DB {

    constructor(config) {
        this.con = mysql.createConnection(config);
        this.con.connect();
    }

    query(sql, args) {
        return new Promise( (resolve, reject) => {
            this.con.query(sql, args, (err, result) => {
                err ? reject(err) : ( result.errno ? reject(result) : resolve(result) );
            })
        })
    }
}

const connectionObject = { 
    user: 'root',
    password: DB_PASSWD,
    database: 'cabapp'
};

let connection = new DB(connectionObject);

module.exports = connection;
