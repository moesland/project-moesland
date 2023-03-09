const crypto = require('crypto');
const { getValidAuthTokenByUserId, removeValidAuthToken } = require('../repository/authToken');

module.exports = AuthService = {
  generateAuthToken: () => {
    this.checkAuthToken();

    const tokenBytes = crypto.randomBytes(32);
    const token = tokenBytes.toString('hex');

    const now = new Date();
    const expires = new Date(now.getTime() + 12 * 60 * 60 * 1000);

    return { token, expires };
  },

  checkAuthToken: (userId) => {
    const token = getValidAuthTokenByUserId(userId);

    if (token) {
      removeValidAuthToken();
      return true;
    }

    return false;
  }

}
