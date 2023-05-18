const mongoose = require('mongoose');

const Participation = mongoose.model('Participation');

const getAll = async () => {
    return Participation.find({})
        .catch((err) => console.error(err));
}

const add = async (data) => {
    const participation = new Participation(data);
    return participation.save()
      .catch((err) => console.error(err));
}

const remove = async (id) => {
    return Participation.findByIdAndDelete(id)
        .catch((err) => console.error(err));
}

const update = async (id, data) => {
    return Participation.findByIdAndUpdate(id, data, { new: true })
     .catch((err) => console.error(err));
}


module.exports = {
    getAll,
    add,
    remove,
    update
};
