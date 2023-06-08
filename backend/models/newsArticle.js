const mongoose = require('mongoose');

const newsArticleSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  bannerImage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image',
  },
  content: {
    type: String,
    required: true,
    validate: {
      async validator(content) {
        try {
          JSON.parse(content);
          return true;
        } catch (err) {
          return false;
        }
      },
      message: 'Content must be a valid JSON object',
    },
  },
});

module.exports = mongoose.model('NewsArticle', newsArticleSchema);
