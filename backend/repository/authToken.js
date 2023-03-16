const mongoose = require('mongoose');

const AuthToken = mongoose.model('AuthToken');

const getPreviousAuthToken = async (userId) => AuthToken.findOne({ userId: { $eq: userId } })
  .then((authToken) => authToken)
  .catch((err) => console.log('Cannot find previous token in AuthToken dataset', err));
const removeAuthTokensById = async (userId) => AuthToken.deleteMany({ userId: { $eq: userId } })
  .catch((err) => console.log('Cannot remove token in AuthToken dataset', err));
const createAuthToken = async (token, expires, userId) => AuthToken.insertMany({
  token,
  expiredate: expires,
  userId,
}).catch((err) => console.log('Cannot add new token in AuthToken dataset', err));
const FindAuthTokenByToken = async (token) => AuthToken.findOne({ token: { $eq: token } })
  .then((authToken) => authToken)
  .catch((err) => console.log('Cannot find token in AuthToken dataset', err));

module.exports = {
  getPreviousAuthToken, removeAuthTokensById, createAuthToken, FindAuthTokenByToken,
};
