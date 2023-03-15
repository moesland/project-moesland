const express = require('express');
const debugLog = require('./middleware/debug');
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();
const mongodb = require('./services/database')();

// Enable CORS for GET and POST requests on all routes
app.use(cors({
    methods: ['GET', 'POST']
}));

// Database setup
require('./models.js');
require('./seed/dataSeeder.js');

//???
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//debuger mode
process.env.NODE_ENV != 'prod' && app.use(debugLog);

// all routes
app.use('/', require('./routes'));

module.exports = app;