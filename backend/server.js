const app = require('express')()
const bodyParser = require('body-parser');
const cors = require('cors');

const customer = require('./controllers/customer');
const driver = require('./controllers/driver');
const ride = require('./controllers/ride');

const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/createId', customer.createId);
app.post('/getAllRideRequests', driver.getAllRideRequests);
app.post('/checkRequestAvailability', driver.checkRequestAvailability);
app.post('/selectRide', driver.selectRide);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

