const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    index: true,
    primary: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    lowercase: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 15,
  },
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
  },
});

module.exports = mongoose.model('User', userSchema);
