const express = require('express');

// middlewares imports
const cors = require('cors');
const bodyParser = require('body-parser');
const debugLog = require('./middlewares/debug');

// config setup
require('dotenv').config();
require('./services/database')();

// init server
const app = express();

// Enable CORS for GET, POST, PUT and DELETE requests on all routes
app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Database setup
require('./models');
require('./seeds/dataSeeder');

// Body parser
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

// debuger mode
if (process.env.NODE_ENV === 'dev') {
  (app.use(debugLog));
}

// all routes
app.use('/', require('./routes'));

module.exports = app;
