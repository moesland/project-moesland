const mongoose = require('mongoose');
const Image = mongoose.model('Image');

module.exports = {
    async getImageById(id) {
        return await Image.findById(id)
            .catch(err => console.log("Cannot find image by id in Image dataset.", err));
    },
    async getImageByName(name) {
        return await Image.findOne({ name: { $eq: name } })
            .catch(err => console.log("Cannot find image by name in Image dataset.", err));
    },
    async updateImageById(id, name, data, contentType) {
        return await Image.findOneAndUpdate(
            { _id: { $eq: id } }, { name: name }, { data: data }, { contentType: contentType })
            .catch(err => console.error(err));
    }
};