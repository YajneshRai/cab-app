const db = require('../model/db');
const ride = require('./ride');
const moment = require('moment');

let driver = {

    /**
     * Check if driver is available before selecting a ride
     * Query params contains 
     */
    checkDriverAvailability : (req, res) => {

        console.log('*** checkDriverAvailability executing ***');
        
        const query = 'select distinct ride.request_id from ride ' +
                ' join ride_taken on ride.request_id = ride_taken.request_id ' +
                ' where ride_taken.driver_id = ? and ride.status = "2" ';
        
        db.query(query, req.query.driverId)
        .then( response => { res.send(response ); })
        .catch( error => { res.send(error); });

    },

    selectRide : (req, res) => {

        console.log('*** selectRide executing ***');

        const data = { 
            request_id: parseInt(req.query.rideId), 
            driver_id: parseInt(req.query.driverId), 
            start_time: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'), 
            end_time: moment(Date.now()).add(5, 'm').format('YYYY-MM-DD HH:mm:ss')
        };

        ride.startRide(data)
        .then( response => { res.send(response ); })
        .catch( error => { res.send(error); });

    } 
}

module.exports = driver;