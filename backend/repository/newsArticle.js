const mongoose = require('mongoose');

const NewsArticle = mongoose.model('NewsArticle');
const Image = require('../models/image');

module.exports = {
  async getNewsArticleById(id) {
    return NewsArticle.findById(id)
      .catch((err) => console.log('Cannot find news article by id in NewsArticle dataset.', err));
  },
  async getNewsArticleByTitle(title) {
    return NewsArticle.findOne({ title: { $eq: title } })
      .catch((err) => console.log('Cannot find news article by title in NewsArticle dataset.', err));
  },
  async updateNewsArticleById(id, title, content) {
    return NewsArticle.findOneAndUpdate({ _id: { $eq: id } }, { title, content }, { new: true })
      .catch((err) => {
        console.error(err);
      });
  },
  async deleteNewsArticle(newsArticle) {
    return NewsArticle.deleteOne(newsArticle)
      .catch((err) => console.error(err));
  },
  async getAllNewsArticle() {
    return NewsArticle.find({}).populate('bannerImage')
      .catch((err) => console.error(err));
  },
  async createNewsArticle(title, date, bannerImage, content) {
    const image = await Image.findOne(bannerImage);
    if (image) {
      const newArticle = new NewsArticle({
        title,
        content,
        date: Date.now(),
        bannerImage: image._id,
      });
      await newArticle.save();
    } else {
      await bannerImage.save();

      const newArticle = new NewsArticle({
        title,
        content,
        date: Date.now(),
        bannerImage: bannerImage._id,
      });

      await newArticle.save();
    }
  },
};
