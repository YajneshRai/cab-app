const moment = require('moment');
const db = require('../model/db');

const RIDE_TIME = 300000; // 5 minutes

let ride = {
    
    /**
     * Creates a ride request in ride table
     * Retuns the response/error  
     * Parameter 1: data (new request information)
     */
    createRide : async (data) => {
        
        console.log('\n*** createRide executing ***');

        const newride = {
            request_time: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            customer_id: data.customer_id,
            location_x: data.location_x,
            location_y: data.location_y,
            status: '1'
        };

        console.log('New request:', newride);

        try {
            const query = 'insert into ride set ?'
            let record = await db.query(query, newride);
            console.log('Records created (ride) :', record.affectedRows);
            return record;
        }
        catch(e) {
            console.error('Records creation errored (ride) :', e);
            return e;
        }
    },

    /**
     * Starts a ride for passed driver
     * Retuns the response/error  
     * Parameter 1: data (ride information)
     */
    startRide : async(data) => {
        
        console.log('\n*** startRide executing ***');

        const query1 = 'insert into ride_taken set ?';
        const query2 = 'update ride set status = ? where request_id = ?';
        
        try {
            let response1 = await db.query(query1, data);
            console.log('Records created (ride_taken) :', response1.affectedRows);

            let response2 = await db.query(query2, [ '2', data.request_id ]);
            console.log('Records updated (ride) :', response2.affectedRows);
            
            console.log('Scheduling auto-complete of ride in next 5 minutes for request_id = %s', data.request_id);
            
            // Registering the method to execute after 5 minutes for auto-update in DB
            setTimeout(() => { 
                module.exports.completeRide(data.request_id);
            }, RIDE_TIME);
            
            return response2;
        }
        catch(e) {
            console.error('Records insertion/update errored (ride / ride_taken) :', e);
            return e;
        }
    },

     /**
     * Completes the ride for passed driver and updates the ride status
     * Retuns the response/error  
     * Parameter 1: rideId (number)
     */
    completeRide : async (rideId) => {

        console.log('\n*** completeRide executing ***');

        const query = 'update ride set status = ? where request_id = ?';
        
        try {
            let response = await db.query(query, [ '3', rideId ]);
            if(response.affectedRows) {
                console.log('Records updated (ride) :', response.affectedRows);
                console.log('Ride with request_id = %s has completed', rideId);
            }
        }
        catch(e) {
            console.error('Records update errored (ride) :', e);
            throw e;
        }
    }

}

module.exports = ride;
