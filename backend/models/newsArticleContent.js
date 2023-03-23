const mongoose = require('mongoose');
const Image = require('./image');

const newsArticleContentSchema = new mongoose.Schema({
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image",
        default: null
    }
});

module.exports = mongoose.model('NewsArticleContent', newsArticleContentSchema);