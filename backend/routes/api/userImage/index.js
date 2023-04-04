const express = require('express');
const { authenticateToken } = require('../../../middlewares/auth');
const { getAllUserImages } = require('../../../repository/userImage');

const router = express.Router();

router.use(express.json());

router.get('/', async (req, res) => {
    try {
        res.status(200).json(await getAllUserImages());
    } catch (err) {
        res.status(500).send('Could not get user images.');
    }
});

router.use('/create', require('./create'));
router.use('/approve', authenticateToken, require('./approve'));
router.use('/decline', authenticateToken, require('./decline'));
router.use('/restore', authenticateToken, require('./restore'));
router.use('/delete', authenticateToken, require('./delete'));

module.exports = router;