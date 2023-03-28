const mongoose = require('mongoose');
const NewsArticle = mongoose.model('NewsArticle');

module.exports = {
    async getNewsArticleById(id) {
        return await NewsArticle.findById(id)
            .catch(err => console.log("Cannot find news article by id in NewsArticle dataset.", err));
    },
    async getNewsArticleByTitle(title) {
        return await NewsArticle.findOne({ title: { $eq: title } })
            .catch(err => console.log("Cannot find news article by title in NewsArticle dataset.", err));
    },
    async updateNewsArticleById(id, title, content) {
        return await NewsArticle.findOneAndUpdate(
            { _id: { $eq: id } }, { title: title, content: content }, { new: true })
            .catch((err) => {
                console.error(err);
            });
    },
    async deleteNewsArticle(newsArticle) {
        return await NewsArticle.deleteOne(newsArticle)
            .catch(err => console.error(err));
    },
    async getAllNewsArticle() {
        return await NewsArticle.find({})
            .populate('bannerImage')
            .catch(err => console.error(err));
    }
};