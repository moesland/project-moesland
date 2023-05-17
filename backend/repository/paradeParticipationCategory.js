const mongoose = require('mongoose');

const ParadeParticipationCategory = mongoose.model('ParadeParticipationCategory');

module.exports = {
  async getAllParadeParticipationCategories() {
    return ParadeParticipationCategory.find({})
      .catch((err) => console.error(err));
  },

  async getParadeParticipationCategoryById(id) {
    return ParadeParticipationCategory.findOne({ _id: { $eq: id } })
      .catch((err) => console.log('Cannot find parade participation category by id in ParadeParticipationCategory dataset.', err));
  },

  async getParadeParticipationCategoryByName(name) {
    return ParadeParticipationCategory.findOne({ name: { $eq: name } })
      .catch((err) => console.log('Cannot find parade participation category by name in ParadeParticipationCategory dataset.', err));
  },

  async updateParadeParticipationCategoryById(id, name, description, color) {
    return ParadeParticipationCategory.findOneAndUpdate(
      { _id: { $eq: id } },
      { name, color, description },
      { new: true },
    )
      .catch((err) => console.error(err));
  },

  async deleteParadeParticipationCategory(paradeParticipationCategory) {
    return ParadeParticipationCategory.deleteOne(paradeParticipationCategory)
      .catch((err) => console.error(err));
  },

  async createParadeParticipationCategory(name, description, color) {
    const newParadeParticipationCategory = new ParadeParticipationCategory({
      name,
      color,
      description,
    });
    await newParadeParticipationCategory.save();
  },

};
