const db = require('../model/db');
const ride = require('./ride');

let customer = {

    createId : async (req, res) => {
        try {
            const query = 'insert into customer(customer_id) values (' + parseInt(req.query.customer_id) + ')';
            let customerResp = await db.query(query, null);
            let rideResp = await ride.createRide(req.query);
            res.send(rideResp);
        }
        catch(e) {
            res.send(e);
        }
    }

}

module.exports = customer;