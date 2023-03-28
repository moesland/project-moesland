const express = require('express');
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
router.use('/api/news-article', require('./api/newsArticle'));
router.use('/api/authToken', require('./api/authToken'));
router.use('/api/news-article', requestLimiter, require('./api/newsArticle'));

module.exports = router;
