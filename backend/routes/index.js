var express = require('express');
var router = express.Router();

//default
router.get('/', function(req, res, next) {
    res.send('hello from home route');
});


module.exports = router;