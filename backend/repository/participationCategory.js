const mongoose = require('mongoose');

const ParticipationCategory = mongoose.model('ParticipationCategory');

module.exports = {
  async getAllParadeParticipationCategories() {
    return ParticipationCategory.find({})
      .catch((err) => console.error(err));
  },

  async getParticipationCategoryById(id) {
    return ParticipationCategory.findOne({ _id: { $eq: id } })
      .catch((err) => console.log('Cannot find parade participation category by id in ParticipationCategory dataset.', err));
  },

  async getParticipationCategoryByName(name) {
    return ParticipationCategory.findOne({ name: { $eq: name } })
      .catch((err) => console.log('Cannot find parade participation category by name in ParticipationCategory dataset.', err));
  },

  async updateParticipationCategoryById(id, name, description, color) {
    return ParticipationCategory.findOneAndUpdate(
      { _id: { $eq: id } },
      { name, color, description },
      { new: true },
    )
      .catch((err) => console.error(err));
  },

  async deleteParticipationCategory(participationCategory) {
    return ParticipationCategory.deleteOne(participationCategory)
      .catch((err) => console.error(err));
  },

  async createParticipationCategory(name, description, color) {
    const newParticipationCategory = new ParticipationCategory({
      name,
      color,
      description,
    });
    await newParticipationCategory.save();
  },

};
