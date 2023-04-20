const mongoose = require('mongoose');
const NewsArticle = mongoose.model('NewsArticle');
const Image = mongoose.model('Image');

module.exports = {
    async getNewsArticleById(id) {
        return await NewsArticle.findOne({ _id: { $eq: id } })
            .catch(err => console.log("Cannot find news article by id in NewsArticle dataset.", err));
    },
    async getNewsArticleByTitle(title) {
        return await NewsArticle.findOne({ title: { $eq: title } })
            .catch(err => console.log("Cannot find news article by title in NewsArticle dataset.", err));
    },
    async updateNewsArticleById(id, title, content) {
        return await NewsArticle.findOneAndUpdate({ _id: { $eq: id } }, { title: title, content: content }, { new: true })
            .catch(err => console.error(err));
    },
    async deleteNewsArticle(newsArticle) {
        return await NewsArticle.deleteOne(newsArticle)
            .catch(err => console.error(err));
    },
    async getAllNewsArticle() {
        return await NewsArticle.find({}).populate("bannerImage")
            .catch(err => console.error(err));
    },
    async createNewsArticle(title, date, bannerImage, content) {
        const image = await Image.findOne(bannerImage);
        if (image) {
            const newArticle = new NewsArticle({
                title: title,
                content: content,
                date: Date.now(),
                bannerImage: image._id
            });
            await newArticle.save();
        }
        else {
            await bannerImage.save();

            const newArticle = new NewsArticle({
                title: title,
                content: content,
                date: Date.now(),
                bannerImage: bannerImage._id
            });

            await newArticle.save();
        }
    }
};