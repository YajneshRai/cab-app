const db = require('../model/db');
const ride = require('./ride');
const moment = require('moment');

let driver = {

    /**
     * Check if driver is available before selecting a ride
     * Query params contains 
     */
/*     checkDriverAvailability : (req, res) => {

        console.log('\n*** checkDriverAvailability executing ***');
        
        const query = 'select distinct ride.request_id from ride ' +
                    'join ride_taken on ride.request_id = ride_taken.request_id ' +
                    'where ride_taken.driver_id = ? and ride.status = "2" ';
        
        db.query(query, req.body.driverId)
        .then( response => { res.send(response ); })
        .catch( error => { res.send(error); });

    }, */

    getAllRideRequests : (req, res) => { 
        
        console.log('\n*** getAllRideRequests executing ***');
        console.log('driver_id:', req.body.driverId);

        const query = 'select ride.request_id, ride.request_time, ride.customer_id, ride.status, ride_taken.start_time, ride_taken.end_time, ride_taken.driver_id ' +
                    'from ride ' +
                    'left join ride_taken on ride.request_id = ride_taken.request_id ';
        
        db.query(query, null)
        .then( response => { 
            console.log('Records found (ride) :', response.length);
            response = module.exports.groupDataBasedOnStatus(response, req.body.driverId);
            console.log('Driver ID: %s -- Waiting: %s, In progress: %s, Complete: %s', req.body.driverId, response.waiting.length, response.progress.length, response.complete.length);
            res.send(response);
        })
        .catch( error => { res.send(error); });
    },

    checkRequestAvailability : (req, res) => {

        console.log('\n*** checkRequestAvailability executing ***');
        console.log('request_id:', req.body.requestId);
        
        const query = 'select status from ride where request_id = ?';

        db.query(query, req.body.requestId)
        .then( response => { 
            console.log('Records found (ride) :', response.length);
            res.send(response);
        })
        .catch( error => { res.send(error); });
    },
    
    selectRide : (req, res) => {

        console.log('\n*** selectRide executing ***');
        console.log('request_id:', req.body.requestId);

        const data = { 
            request_id: parseInt(req.body.requestId), 
            driver_id: parseInt(req.body.driverId), 
            start_time: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'), 
            end_time: moment(Date.now()).add(5, 'm').format('YYYY-MM-DD HH:mm:ss')
        };

        ride.startRide(data)
        .then( response => { res.send(response ); })
        .catch( error => { res.send(error); });

    },

    groupDataBasedOnStatus : (data, driverId) => {
        
        let rideInfo = { waiting: [], progress: [], complete: [] };

        data.forEach(dt => {
            if(dt.status == '1')
                rideInfo.waiting.push(dt);
            else if(dt.status == '2' && dt.driver_id == driverId)
                rideInfo.progress.push(dt);
            else if(dt.status =='3' && dt.driver_id == driverId)    
                rideInfo.complete.push(dt);
        });

        return rideInfo;
    }
}

module.exports = driver;