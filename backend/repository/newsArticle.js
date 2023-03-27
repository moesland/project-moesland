const mongoose = require('mongoose');
const NewsArticle = mongoose.model('NewsArticle');

module.exports = {
    async updateNewsArticleByID(id, date, title, bannerImage, content) {
        return await NewsArticle.findOneAndUpdate(
            { id: { $eq: id } }, { date: { $eq: date } }, { title: { $eq: title } }, { bannerImage: { $eq: bannerImage } }, { content: { $eq: content } })
            .catch((err) => {
                console.error(err);
            });
    },
    async createNewsArticle(title, date, bannerImage, content){
        if(bannerImage != null){
            const newArticle = new NewsArticle({
                title: title,
                content: content,
                date: Date.now(),
                bannerImage: bannerImage._id
            });
            await newArticle.save();
        }
        else{
            const newImage = new Image({
                name: bannerImage.originalname,
                data: fs.readFileSync(filePath),
                contentType: bannerImage.mimetype
            });
            const savedImage = await newImage.save();

            const newArticle = new NewsArticle({
                title: title,
                content: content,
                date: Date.now(),
                bannerImage: savedImage._id
            });
            await newArticle.save();
        }          
    }
};