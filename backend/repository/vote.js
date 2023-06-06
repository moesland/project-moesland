const mongoose = require('mongoose');

const Vote = mongoose.model('Vote');
const sanitize = require('mongo-sanitize');

const getAllExtra = async (query) => Vote.find(query).populate('participant').populate('category').populate('event');

const getAll = async (query) => Vote.find(query);

const add = async (data) => {
  const vote = new Vote(data);
  return vote.save();
};

const remove = async (id) => Vote.findByIdAndDelete(id);

const update = async (id, data) => {
  const cleanData = sanitize(data);
  return Vote.findByIdAndUpdate(id, cleanData, { new: true });
};

const bulkDelete = async (votes) => {
  const cleanData = sanitize(votes);
  
  return Vote.deleteMany({_id: { $in: cleanData }});
}

const bulkAdd = async (votes) => {
  const cleanData = sanitize(votes);

  return Vote.insertMany(cleanData);
}

module.exports = {
  getAllExtra,
  getAll,
  add,
  remove,
  update,
  bulkDelete,
  bulkAdd,
};
