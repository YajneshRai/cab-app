const db = require('../model/db');
const ride = require('./ride');
const moment = require('moment');

let driver = {

    /**
     * Returns all ride requests 
     * The flag is_driver is passed to indicate if the result being fetchd is for a driver
     * In case of driver, pass driver_id along with is_driver = false 
     * Parameter 1: is_driver (boolean)
     * Parameter 2: driver_id (number)
     */
    getAllRideRequests : async (req, res) => { 
        
        console.log('\n*** getAllRideRequests executing ***');

        let driverStatus = [];

        const query1 = 'select available from driver';
        
        const query2 = 'select ride.request_id, ride.request_time, ride.customer_id, ride.location_x, ride.location_y, ride.status, ride_taken.start_time, ride_taken.end_time, ride_taken.driver_id ' +
                        'from ride ' +
                        'left join ride_taken on ride.request_id = ride_taken.request_id '+
                        'order by ride.request_id desc ';

        try {
            if(req.body.is_driver)  {

                console.log('driver_id:', req.body.driver_id);

                let driverResp = await db.query(query1, req.body.driver_id);
                driverStatus = driverResp.map(st => st.available);
            }

            let response = await db.query(query2, null);
            console.log('Records found (ride) :', response.length);

            if(req.body.is_driver) {
                response = module.exports.groupDataBasedOnStatus(response, req.body.driver_id, driverStatus);
                console.log('driver_id: %s -- Waiting: %s, Ongoing: %s, Complete: %s', req.body.driver_id, response.waiting.length, response.ongoing.length, response.complete.length);
            }
            
            res.send(response);

        }
        catch(error) {
            console.log('Records fetching errored (driver / ride / ride_taken) : ', error);
            res.status(500).json(error); 
        }
    },

    /**
     * Check if the request is still available (waiting state)
     * Retuns an object with single property available = true/false
     * Parameter 1: request_id (number)
     */
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
    
    /**
     * Driver selects the ride request
     * Retuns an object with single property success = true/false
     * Parameter 1: request_id (number)
     * Parameter 2: driver_id (number)
     */
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
        .then( response => { 
            response.affectedRows ? res.send({success: true}) : res.send({success: false});
        })
        .catch( error => { res.status(500).json(error);; });

    },

    /**
     * Groups data as waiting/ongoing/complete for passed driver_id
     * Retuns an object containg 3 arrys (as per status) with data 
     * Parameter 1: data (array fetched from DB)
     * Parameter 1: driverId (number)
     */
    groupDataBasedOnStatus : (data, driverId, driversStatus) => {
        
        let rideInfo = { waiting: [], ongoing: [], complete: [] };

        data.forEach(dt => {
            //Show request to only available drivers
            if(dt.status == '1') {
                //Check if the driver is among 3 nearest ones to the ride request location
                //If the driver is not available distance is not calculated for him
                let isNearestDriver = module.exports.calcDistance(dt, driverId, driversStatus);
                if(isNearestDriver)
                    rideInfo.waiting.push(dt);
            }
            else if(dt.status == '2' && dt.driver_id == driverId)
                rideInfo.ongoing.push(dt);
            else if(dt.status =='3' && dt.driver_id == driverId)    
                rideInfo.complete.push(dt);
        });

        return rideInfo;
    },

    /**
     * Calulates distance of ride location from each driver  
     * Returns a boolean if it is among minimum 3
     * Parameter 1: waitingRide (ride request object)
     * Parameter 1: driverId (number)
     */
    calcDistance : (waitingRide, driverId, driversStatus) => {

        //Assuming driver_id = driver.location_x = driver.location_y
        let x1 = 0, y1 = 0, driverDistance = -1, isMin = false; 
        let x2 = waitingRide.location_x, y2 = waitingRide.location_y;
        let distances = [];
        
        //If driver is not available don't show him the request
        if(driversStatus[driverId - 1] == '0')
            return isMin;
        
        //Using Euclidean distance on 2-dimensional plane to calculate distance between 2 points
        //If the current driver's distance is among least 3 values, ride request is added to his waiting list 
        for(let i=1; i <= 5; i++) {
            //driver's location -- (1,1) , (2,2) , (3,3) , (4,4) , (5,5)
            x1 = y1 = i; 
            let dist = Math.sqrt( Math.pow((x1 - x2), 2) +  Math.pow((y1 - y2), 2));
            if(i == driverId)
                driverDistance = dist;
            distances.push(dist);
        }

        let newDistance = [];

        //Fetch distance of only available drivers
        for(let i=0; i < driversStatus.length; i++) {
            if(driversStatus[i] == '1') {
                newDistance.push(distances[i]);
            }
        }

        //Sort in ascending order
        newDistance = newDistance.sort((a,b) => a-b);
        let driversAvailableCount = newDistance.length;
        
        //Check if driver's distance exists in least 3
        let minDistance = driversAvailableCount >= 3 ? newDistance.slice(0, 3) :  newDistance.slice(0, driversAvailableCount);
        isMin = minDistance.indexOf(driverDistance) != -1 ? true : false;

        return isMin;
    }
}

module.exports = driver;
