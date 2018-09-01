const app = require('express')()
const bodyParser = require('body-parser');

const customer = require('./controllers/customer');
const driver = require('./controllers/driver');
const ride = require('./controllers/ride');

const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get('/createId', customer.createId);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

