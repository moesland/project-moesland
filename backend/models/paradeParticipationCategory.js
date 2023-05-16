const mongoose = require('mongoose');

function colorValidator(value) {
  return /^#[0-9A-F]{6}$/i.test(value);
}

const paradeParticipationCategorySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  color: {
    type: String,
    validate: [colorValidator, 'not a valid color'],
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model('ParadeParticipationCategory', paradeParticipationCategorySchema);
