const mongoose = require('mongoose');

const Participation = mongoose.model('Participation');
const sanitize = require('mongo-sanitize');

const getAll = async () => Participation.find({}).populate('event').populate('category');

const add = async (data) => {
  const participation = new Participation(data);
  return participation.save();
};

const remove = async (id) => Participation.findByIdAndDelete(id);

const update = async (id, data) => {
  const cleanData = sanitize(data);
  return Participation.findByIdAndUpdate(id, cleanData, { new: true });
};

module.exports = {
  getAll,
  add,
  remove,
  update,
};
