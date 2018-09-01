const db = require('../model/db');
const ride = require('./ride');

let customer = {

    createId : async (req, res) => {

        console.log('*** createId executing ***');

        try {
            const custid = { customer_id: req.query.customer_id };
            const query = 'insert into customer set ? on duplicate key update ?';
            let customerResp = await db.query(query, [custid, custid]);
            let rideResp = await ride.createRide(req.query);
            res.send(rideResp);
        }
        catch(e) {
            res.send(e);
        }
    }

}

module.exports = customer;