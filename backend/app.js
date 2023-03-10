const express = require('express');
const app = express();
const mongodb = require('./services/database')();

app.use('/', require('./routes'));

module.exports = app;