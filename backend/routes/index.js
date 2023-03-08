var express = require('express');
var router = express.Router();

//default
router.get('/', function(req, res, next) {
    res.send('hello from home route');
});

//add here all other routes
router.use('/api/location', require('./api/location'));
router.use('/api/parade', require('./api/parade'));

module.exports = router;