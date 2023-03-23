const mongoose = require('mongoose');

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
    content: [{
        id: {
            type: Number,
            required: true,
            unique: true,
            index: true,
            primary: true
        },
        text: {
            type: String,
            default: null
        },
        image: {
            type: String,
            default: null
        }
    }]
});

module.exports = mongoose.model('NewsArticle', newsArticleSchema);