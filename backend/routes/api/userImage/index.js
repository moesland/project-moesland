const express = require('express');
const { authenticateToken } = require('../../../middlewares/auth');

const router = express.Router();

router.use(express.json());

router.use('/create', require('./create'));
router.use('/approve', authenticateToken, require('./approve'));
router.use('/decline', authenticateToken, require('./decline'));
router.use('/restore', authenticateToken, require('./restore'));
router.use('/delete', authenticateToken, require('./delete'));

module.exports = router;