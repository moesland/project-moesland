const crypto = require('crypto');
const { getPreviousAuthToken, removeAuthTokensById, createAuthToken } = require('../repository/authToken');

module.exports = AuthService = {
  generateAuthToken: async (userId) => {
    await AuthService.removeOldAuthToken(userId);

    const tokenBytes = crypto.randomBytes(32);
    const token = tokenBytes.toString('hex');

    const now = new Date();
    const expires = new Date(now.getTime() + 12 * 60 * 60 * 1000);

    await createAuthToken(token, expires, userId);

    return { token, expires };
  },

  removeOldAuthToken: async (userId) => {
    const authToken = await getPreviousAuthToken(userId);
    if (authToken) {
      await removeAuthTokensById(userId);
      return true;
    }

    return false;
  }

}
