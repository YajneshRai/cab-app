const db = require('../model/db');
const ride = require('./ride');

let customer = {

    createId : async (req, res) => {

        console.log('\n*** createId executing ***');

        try {
            const custid = { customer_id: req.body.customer_id };
            const query = 'insert into customer set ? on duplicate key update ?';
            
            let customerResp = await db.query(query, [custid, custid]);
            console.log('Records created (customer) :', customerResp.affectedRows);

            let rideResp = await ride.createRide(req.body);
            res.send(rideResp);
        }
        catch(error) {
            console.error('Records insertion errored (customer / ride) :', error);
            res.status(500).json(error);;
        }
    }

}

module.exports = customer;