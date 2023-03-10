const express = require('express');
const debugLog = require('./middleware/debug');
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

process.env.NODE_ENV != 'prod' && app.use(debugLog);

app.use('/', require('./routes'));

module.exports = app;