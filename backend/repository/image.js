const mongoose = require('mongoose');

const Image = mongoose.model('Image');
const sanitize = require('mongo-sanitize');

module.exports = {
  async getImageById(id) {
    return Image.findOne({ _id: { $eq: id } })
      .catch((err) => console.log('Cannot find image by id in Image dataset.', err));
  },
  async getImageByName(name) {
    return Image.findOne({ name: { $eq: name } })
      .catch((err) => console.log('Cannot find image by name in Image dataset.', err));
  },
  async updateImageById(id, name, data, contentType) {
    const cleanName = sanitize(name);
    const cleanData = sanitize(data);
    const cleanContentType = sanitize(contentType);

    return Image.findOneAndUpdate(
      { id: { $eq: id } },
      { name: cleanName, data: cleanData, contentType: cleanContentType },
    )
      .catch((err) => console.error(err));
  },
};
