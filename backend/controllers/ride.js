const moment = require('moment');
const db = require('../model/db');

let ride = {

    createRide : async (data, cb) => {
        const newride = {
            request_time: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            customer_id: data.customer_id,
            location_x: data.location_x,
            location_y: data.location_y,
            status: '1'
        };

        try {
            const query = 'insert into ride set ?'
            let record = await db.query(query, newride); console.log(record);
            return record;
        }
        catch(e) {console.log(e);
            return e;
        }
    }

}

module.exports = ride;