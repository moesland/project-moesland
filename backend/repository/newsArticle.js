const mongoose = require('mongoose');
const NewsArticle = mongoose.model('NewsArticle');

module.exports = {
    async updateNewsArticleByID(id, date, title, bannerImage, content) {
        return await NewsArticle.findOneAndUpdate(
            { id: { $eq: id } }, { date: { $eq: date } }, { title: { $eq: title } }, { bannerImage: { $eq: bannerImage } }, { content: { $eq: content } })
            .catch((err) => {
                console.error(err);
            });
    }
};