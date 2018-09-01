const moment = require('moment');
const db = require('../model/db');

const RIDE_TIME = 300000;

let ride = {

    
    createRide : async (data) => {
        
        console.log('*** createRide executing ***');

        const newride = {
            request_time: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            customer_id: data.customer_id,
            location_x: data.location_x,
            location_y: data.location_y,
            status: '1'
        };

        try {
            const query = 'insert into ride set ?'
            let record = await db.query(query, newride);
            return record;
        }
        catch(e) {
            return e;
        }
    },

    startRide : async(data) => {
        
        console.log('*** startRide executing ***');

        const query1 = 'insert into ride_taken set ?';
        const query2 = 'update ride set status = ? where request_id = ?';
        try {
            let response1 = await db.query(query1, data);
            let response2 = await db.query(query2, [ '2', data.request_id ]);
            
            console.log('Scheduling auto-complete of ride in next 5 minutes for request_id = %s', data.request_id);
            setTimeout(() => { 
                module.exports.completeRide(data.request_id);
            }, RIDE_TIME);
            
            return response2;
        }
        catch(e) {
            console.log(e);
            return e;
        }
    },

    completeRide : async (rideId) => {

        console.log('*** completeRide executing ***');

        const query = 'update ride set status = ? where request_id = ?';
        try {
            let response = await db.query(query, [ '3', rideId ]);
            if(response.affectedRows)
               console.log('Ride with request_id = %s has completed', rideId)
        }
        catch(e) {
            throw e;
        }
    }

}

module.exports = ride;