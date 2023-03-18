const { getPreviousAuthToken, removeAuthTokensById, createAuthToken } = require('../repository/authToken');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

module.exports = AuthService = {
  generateAuthToken: async (userId) => {
    await AuthService.removeOldAuthToken(userId);
    
    const token = jwt.sign({ sub: userId }, secretKey, { expiresIn: '12h' });

    const now = new Date();
    const expires = new Date(now.getTime() + 12 * 60 * 60 * 1000); //12 hours.

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
