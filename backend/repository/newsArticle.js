const mongoose = require('mongoose');
const NewsArticle = mongoose.model('NewsArticle');

module.exports = {
    async getNewsArticleById(id) {
        return await NewsArticle.findById(id)
            .catch(err => console.log("Cannot find news article by id in NewsArticle dataset.", err));
    },
    async updateNewsArticleByID(id, date, title, bannerImage, content) {
        return await NewsArticle.findOneAndUpdate(
            { id: { $eq: id } }, { date: { $eq: date } }, { title: { $eq: title } }, { bannerImage: { $eq: bannerImage } }, { content: { $eq: content } })
            .catch(err => console.error(err));
    },
    async deleteNewsArticle(newsArticle) {
        return await NewsArticle.deleteOne(newsArticle)
            .catch(err => console.error(err));
    }
};