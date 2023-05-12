const express = require('express');
const { authenticateToken } = require('../../../middlewares/auth');
const { getAllUserImages, getAllPendingUserImages, getAllDeclinedUserImages } = require('../../../repository/userImage');
const { requestLimiter } = require('../../../middlewares/security');

const router = express.Router();

router.use(express.json());

router.get('/', authenticateToken, requestLimiter, async (req, res) => {
  try {
    const { isPending, isDeclined } = req.query;

    if (isPending) {
      return res.status(200).json(await getAllPendingUserImages());
    } if (isDeclined) {
      return res.status(200).json(await getAllDeclinedUserImages());
    }

    return res.status(200).json(await getAllUserImages());
  } catch (err) {
    return res.status(500).send('Could not get user images.');
  }
});

router.use('/create', require('./create'));
router.use('/approve', authenticateToken, require('./approve'));
router.use('/decline', authenticateToken, require('./decline'));
router.use('/restore', authenticateToken, require('./restore'));
router.use('/delete', authenticateToken, require('./delete'));

module.exports = router;
