const express = require('express');
const { authenticateTokenRole, authenticateToken } = require('../middlewares/auth');
const { requestLimiter } = require('../middlewares/security');

const router = express.Router();

// default
router.get('/', (req, res) => {
  res.send('backend api is running!');
});

router.use('/api/docs', requestLimiter, require('./api/swagger'));

// Add all other routes here
router.use('/api/auth', requestLimiter, require('./api/auth'));
router.use('/api/role', require('./api/role'));
router.use('/api/user', require('./api/user'));

router.use('/api/user/add', authenticateTokenRole('SuperAdmin'), requestLimiter, require('./api/user/add'));
router.use('/api/user/update', authenticateTokenRole('SuperAdmin'), requestLimiter, require('./api/user/update'));
router.use('/api/user/delete', authenticateTokenRole('SuperAdmin'), requestLimiter, require('./api/user/delete'));
router.use('/api/user/get-list', authenticateTokenRole('SuperAdmin'), requestLimiter, require('./api/user/getList'));
router.use('/api/user/role', require('./api/user/role'));

router.use('/api/news-article', requestLimiter, require('./api/newsArticle'));

router.use('/api/participation-category', requestLimiter, require('./api/participationCategory/index'));
router.use('/api/participation-category/create', authenticateTokenRole('SuperAdmin'), requestLimiter, require('./api/participationCategory/create'));
router.use('/api/participation-category/delete', authenticateTokenRole('SuperAdmin'), requestLimiter, require('./api/participationCategory/delete'));
router.use('/api/participation-category/update', authenticateTokenRole('SuperAdmin'), requestLimiter, require('./api/participationCategory/update'));

router.use('/api/user-image', require('./api/userImage'));

router.use('/api/event', requestLimiter, require('./api/event/index'));
router.use('/api/event/add', requestLimiter, require('./api/event/add'));
router.use('/api/event/delete', requestLimiter, require('./api/event/delete'));
router.use('/api/event/update', requestLimiter, require('./api/event/update'));

router.use('/api/participation', requestLimiter, authenticateToken, require('./api/participation'));

module.exports = router;
