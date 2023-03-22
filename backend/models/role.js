const mongoose = require('mongoose');

const rolSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    index: true,
    primary: true,
  },
  rolename: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('Role', rolSchema);
