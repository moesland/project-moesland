const express = require('express');
const { authenticateTokenRole } = require('../middlewares/auth');
const { requestLimiter } = require('../middlewares/security');

const router = express.Router();

// default
router.get('/', (req, res) => {
  res.send('hello from home route');
});

// Add all other routes here
router.use('/api/auth', requestLimiter, require('./api/auth'));
router.use('/api/role', require('./api/role'));
router.use('/api/user', require('./api/user'));

router.use('/api/user/add', authenticateTokenRole('SuperAdmin'), requestLimiter, require('./api/user/add'));
router.use('/api/user/update', authenticateTokenRole('SuperAdmin'), requestLimiter, require('./api/user/update'));
router.use('/api/user/delete', authenticateTokenRole('SuperAdmin'), requestLimiter, require('./api/user/delete'));
router.use('/api/user/get-list', require('./api/user/getList'));
router.use('/api/user/role', require('./api/user/role'));

router.use('/api/news-article', requestLimiter, require('./api/newsArticle'));

router.use('/api/parade-category', requestLimiter, require('./api/paradeParticipationCategory/index'));
router.use('/api/parade-category/create', authenticateTokenRole('SuperAdmin'), requestLimiter, require('./api/paradeParticipationCategory/create'));
router.use('/api/parade-category/delete', authenticateTokenRole('SuperAdmin'), requestLimiter, require('./api/paradeParticipationCategory/delete'));
router.use('/api/parade-category/update', authenticateTokenRole('SuperAdmin'), requestLimiter, require('./api/paradeParticipationCategory/update'));

router.use('/api/user-image', require('./api/userImage'));

router.use('/api/event', requestLimiter, require('./api/event/index'));
router.use('/api/event/add', requestLimiter, require('./api/event/add'));
router.use('/api/event/delete', requestLimiter, require('./api/event/delete'));
router.use('/api/event/update', requestLimiter, require('./api/event/update'));

router.use('/api/participation', requestLimiter, require('./api/participation'));

module.exports = router;
