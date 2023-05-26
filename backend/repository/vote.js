const mongoose = require('mongoose');

const Vote = mongoose.model('Vote');
const sanitize = require('mongo-sanitize');

const getAll = async (query) => Vote.find(query).populate('participant').populate('category');

const add = async (data) => {
  const vote = new Vote(data);
  return vote.save();
};

const remove = async (id) => Vote.findByIdAndDelete(id);

const update = async (id, data) => {
  const cleanData = sanitize(data);
  return Vote.findByIdAndUpdate(id, cleanData, { new: true });
};

module.exports = {
  getAll,
  add,
  remove,
  update,
};
