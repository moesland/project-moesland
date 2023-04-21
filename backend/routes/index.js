const express = require('express');
const { authenticateTokenRole } = require('../middlewares/auth');
const { requestLimiter } = require('../middlewares/security');

const router = express.Router();

// default
router.get('/', (req, res) => {
  res.send('hello from home route');
});

// add here all other routes
router.use('/api/auth', requestLimiter, require('./api/auth'));
router.use('/api/role', require('./api/role'));
router.use('/api/user', require('./api/user'));

router.use('/api/user/add', authenticateTokenRole('SuperAdmin'), requestLimiter, require('./api/user/add'));
router.use('/api/user/update', authenticateTokenRole('SuperAdmin'), requestLimiter, require('./api/user/update'));
router.use('/api/user/delete', authenticateTokenRole('SuperAdmin'), requestLimiter, require('./api/user/delete'));
router.use('/api/user/get-list', require('./api/user/getList'));

router.use('/api/authToken', require('./api/authToken'));
router.use('/api/news-article', requestLimiter, require('./api/newsArticle'));

router.use('/api/user-image', require('./api/userImage'));

module.exports = router;
