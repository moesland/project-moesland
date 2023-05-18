const mongoose = require('mongoose');

const Participation = mongoose.model('Participation');

const getAll = async () => Participation.find({});

const add = async (data) => {
  const participation = new Participation(data);
  return participation.save();
};

const remove = async (id) => Participation.findByIdAndDelete(id);

const update = async (id, data) => {
  const allowedFields = ['startnumber', 'name', 'category', 'event'];
  const sanitizedData = {};
  
  for (const field of allowedFields) {
    if (data[field] !== undefined) {
      sanitizedData[field] = data[field];
    }
  }

  return Participation.findByIdAndUpdate(id, data, { new: true })
};

module.exports = {
  getAll,
  add,
  remove,
  update,
};
