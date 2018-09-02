const db = require('../model/db');
const ride = require('./ride');
const moment = require('moment');

let driver = {

    getAllRideRequests : (req, res) => { 
        
        console.log('\n*** getAllRideRequests executing ***');
        
        if(req.body.is_driver)
            console.log('driver_id:', req.body.driver_id);

        const query = 'select ride.request_id, ride.request_time, ride.customer_id, ride.status, ride_taken.start_time, ride_taken.end_time, ride_taken.driver_id ' +
                    'from ride ' +
                    'left join ride_taken on ride.request_id = ride_taken.request_id '+
                    'order by ride.request_id desc ';
        
        db.query(query, null)
        .then( response => { 
            console.log('Records found (ride) :', response.length);
            if(req.body.is_driver) {
                response = module.exports.groupDataBasedOnStatus(response, req.body.driver_id);
                console.log('driver_id: %s -- Waiting: %s, Ongoing: %s, Complete: %s', req.body.driver_id, response.waiting.length, response.ongoing.length, response.complete.length);
            }
            res.send(response);
        })
        .catch( error => { res.status(500).json(error); });
    },

    checkRequestAvailability : (req, res) => {

        console.log('\n*** checkRequestAvailability executing ***');
        console.log('request_id:', req.body.request_id);
        
        const query = 'select * from ride where request_id = ? and status = ?';

        db.query(query, [ req.body.request_id, '1'] )
        .then( response => { 
            console.log('Records found (ride) :', response.length);
            response.length ? res.send({ available: true}) : res.send({ available: false});
        })
        .catch( error => { res.status(500).json(error);; });
    },
    
    selectRide : (req, res) => {

        console.log('\n*** selectRide executing ***');
        console.log('request_id:', req.body.request_id);
        console.log('driver_id:', req.body.driver_id);

        const data = { 
            request_id: parseInt(req.body.request_id), 
            driver_id: parseInt(req.body.driver_id), 
            start_time: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'), 
            end_time: moment(Date.now()).add(5, 'm').format('YYYY-MM-DD HH:mm:ss')
        };

        ride.startRide(data)
        .then( response => { res.send(response ); })
        .catch( error => { res.status(500).json(error);; });

    },

    groupDataBasedOnStatus : (data, driverId) => {
        
        let rideInfo = { waiting: [], ongoing: [], complete: [] };

        data.forEach(dt => {
            if(dt.status == '1')
                rideInfo.waiting.push(dt);
            else if(dt.status == '2' && dt.driver_id == driverId)
                rideInfo.ongoing.push(dt);
            else if(dt.status =='3' && dt.driver_id == driverId)    
                rideInfo.complete.push(dt);
        });

        return rideInfo;
    }
}

module.exports = driver;