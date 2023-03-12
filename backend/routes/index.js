var express = require('express');
var router = express.Router();

//default
router.get('/', function(req, res, next) {
    res.send('hello from home route');
});

//add here all other routes
router.use('/api/location', require('./api/location'));
router.use('/api/role', require('./api/role'));
router.use('/api/user', require('./api/user'));

router.use('/api/user/add', require('./api/user/add'));
router.use('/api/user/update', require('./api/user/update'));
router.use('/api/user/delete', require('./api/user/delete'));

router.use('/api/authToken', require('./api/authToken'));

module.exports = router;