const mongoose = require('mongoose');

const newsArticleSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    bannerImage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image"
    },
    content: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('NewsArticle', newsArticleSchema);