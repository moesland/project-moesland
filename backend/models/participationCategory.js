const mongoose = require('mongoose');

const participationCategorySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  color: {
    type: String,
    validate: {
      validator(value) {
        return /^#[0-9A-F]{6}$/i.test(value);
      },
      message: (props) => `${props.value} is not a valid color, must be a # followed by 6 characters`,
    },
  },
});

module.exports = mongoose.model('ParticipationCategory', participationCategorySchema);
