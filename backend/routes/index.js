const express = require('express');
const router = express.Router();

//default
router.get('/', function(req, res, next) {
    res.send('hello from home route');
});

//add here all other routes
router.use('/api/auth', require('./api/auth'));

module.exports = router;