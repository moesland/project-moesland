const express = require('express');

const router = express.Router();

router.use(express.json());

router.use('/create', require('./create'));
router.use('/approve', require('./approve'));
router.use('/decline', require('./decline'));
router.use('/delete', require('./delete'));

module.exports = router;