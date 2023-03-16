const express = require('express');

// middleware imports
const cors = require('cors');
const bodyParser = require('body-parser');
const debugLog = require('./middleware/debug');

// config setup
require('dotenv').config();
require('./services/database')();

// init server
const app = express();

// Enable CORS for GET and POST requests on all routes
app.use(cors({
  methods: ['GET', 'POST'],
}));

// Database setup
require('./models');
require('./seed/dataSeeder');

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// debuger mode
if (process.env.NODE_ENV !== 'prod') {
  (app.use(debugLog));
}

// all routes
app.use('/', require('./routes'));

module.exports = app;
