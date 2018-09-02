const db = require('../model/db');
const ride = require('./ride');

let customer = {

    /**
     * Create Customer ID if does not exist
     * Also create a new request with associated Customer ID
     * Parameter : customer_id (string)
     */
    createId : async (req, res) => {

        console.log('\n*** createId executing ***');

        try {
            const custid = { customer_id: req.body.customer_id };
            const query1 = 'insert into customer set ? on duplicate key update ?';
            
            let customerResp = await db.query(query1, [custid, custid]);
            console.log('Records created (customer) :', customerResp.affectedRows);

            const query2 = 'select * from ride where status = ?';
            let waitingRecs = await db.query(query2, '1');
            
            if(waitingRecs.length >= 10) {
                res.send({success: false});
            }
            else {
                let rideResp = await ride.createRide(req.body);
                rideResp.affectedRows ? res.send({success: true}) : res.send({success: false});
            }
        }
        catch(error) {
            console.error('Records insertion errored (customer / ride) :', error);
            res.status(500).json(error);;
        }
    }

}

module.exports = customer;
