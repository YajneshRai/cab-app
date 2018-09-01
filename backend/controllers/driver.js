const db = require('../model/db');

let driver = {

    createRide : async (req, res) => {
        connection.query('select * from driver')
        .then(resp => { console.log(resp); res.send(resp); })
        .catch(rej => { console.log(rej); res.send(rej); });
    }

}

module.exports = driver;