const mongoose = require('mongoose');

const Participation = mongoose.model('Participation');

const getAll = async () => {
  try {
    return await Participation.find({});
  } catch (err) {
    throw err;
  }
};

const add = async (data) => {
  try {
    const participation = new Participation(data);
    return await participation.save();
  } catch (err) {
    throw err;
  }
};

const remove = async (id) => {
  try {
    return await Participation.findByIdAndDelete(id);
  } catch (err) {
    throw err;
  }
};

const update = async (id, data) => {
  try {
    return await Participation.findByIdAndUpdate(id, data, { new: true });
  } catch (err) {
    throw err;
  }
};


module.exports = {
  getAll,
  add,
  remove,
  update,
};
