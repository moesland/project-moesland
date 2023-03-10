const mongoose = require('mongoose');

const authTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true
  },
  expiredate: {
    type: Date,
    required: true
  },
  idusers: {
    type: Number,
    required: true
  }
});

const AuthToken = mongoose.model('AuthToken', authTokenSchema);

module.exports = AuthToken;
