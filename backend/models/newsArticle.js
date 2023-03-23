const mongoose = require('mongoose');
const NewsArticleContent = require('./newsArticleContent');
const Image = require('./image');

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
        ref: "Image",
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('NewsArticle', newsArticleSchema);