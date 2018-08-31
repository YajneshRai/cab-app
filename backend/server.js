const app = require('express')()
const mysql = require('mysql');
const bodyParser = require('body-parser');
//const promise = require('promise');

const user = require('./modules/user');
const PORT = 3000;

const connectionObject = { 
    user: 'root',
    password: 'cabapp'
}

const con = mysql.createConnection(connectionObject);

con.connect(err => {
    if(err)
        throw err;
    console.log('CONNECTED!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get('/createId', user.createId);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

