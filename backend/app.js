const express = require('express');
const app = express();
const mongodb = require('./services/database')();

require('./models.js');
require('./seed/dataSeeder.js');

app.use('/', require('./routes'));


module.exports = app;