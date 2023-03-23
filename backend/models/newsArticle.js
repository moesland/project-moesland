const mongoose = require('mongoose');
const NewsArticleContent = require('./newsArticleContent');

const newsArticleSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
        index: true,
        primary: true
    },
    date: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    bannerImage: {
        type: String,
        required: true
    },
    content: [NewsArticleContent]
});

module.exports = mongoose.model('NewsArticle', newsArticleSchema);