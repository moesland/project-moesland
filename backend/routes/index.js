const express = require('express');

const router = express.Router();

// default
router.get('/', (req, res) => {
  res.send('hello from home route');
});

// add here all other routes
router.use('/api/location', require('./api/location'));

module.exports = router;
