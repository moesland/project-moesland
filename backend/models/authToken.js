const mongoose = require('mongoose');

const authTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  expiredate: {
    type: Date,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('AuthToken', authTokenSchema);
