const mongoose = require('mongoose');

const Participation = mongoose.model('Participation');

const getAll = async () => Participation.find({});

const add = async (data) => {
  const participation = new Participation(data);
  return participation.save();
};

const remove = async (id) => Participation.findByIdAndDelete(id);

const update = async (id, data) => Participation.findByIdAndUpdate(id, data, { new: true });

module.exports = {
  getAll,
  add,
  remove,
  update,
};
