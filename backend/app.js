const express = require('express');
const { requestLimiter } = require('./middleware/security');
const app = express();
const mongodb = require('./services/database')();

require('./models.js');
require('./seed/dataSeeder.js');

app.use('/', require('./routes'));
app.use(requestLimiter);


module.exports = app;