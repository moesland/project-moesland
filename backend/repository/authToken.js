const mongoose = require('mongoose');
const AuthToken = mongoose.model('AuthToken');

module.exports = {
    getPreviousAuthToken: async (userId) => {
        return await AuthToken.findOne({ userId: { $eq: userId } })
            .then(authToken => { if (authToken) return authToken; })
            .catch(err => console.log("Cannot find previous token in AuthToken dataset", err));

    },
    removeAuthTokensById: async (userId) => {
        return await AuthToken.deleteMany({ userId: { $eq: userId } })
            .catch(err => console.log("Cannot remove token in AuthToken dataset", err));
    },
    createAuthToken: async (token, expires, userId) => {
        return await AuthToken.insertMany({
            token: token,
            expiredate: expires,
            userId: userId 
        }).catch(err => console.log("Cannot add new token in AuthToken dataset", err))
    },
    FindAuthTokenByToken: async (token) => {
        return await AuthToken.findOne({ token: { $eq: token } })
            .then(authToken => { if (authToken) return authToken; })
            .catch(err => console.log("Cannot find token in AuthToken dataset", err));

    },
}