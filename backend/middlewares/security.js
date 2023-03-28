const RateLimit = require('express-rate-limit');

const requestLimiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60,
});

module.exports = { requestLimiter };
