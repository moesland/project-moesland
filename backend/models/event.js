const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startdate: {
    type: Date,
    required: true,
  },
  enddate: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: false,
  },
  isParade: {
    type: Boolean,
    required: true,
  },
  latitude: {
    type: Number,
    required: false,
  },
  longitude: {
    type: Number,
    required: false,
  },
  radius: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model('Event', eventSchema);
