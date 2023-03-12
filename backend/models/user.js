const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    index: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 20
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    lowercase: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 15
  },
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role'
  }
});

userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isNew) {
    try {
      const maxDoc = await mongoose.model('User', userSchema)
        .findOne({}, 'id', { sort: { id: -1 } })
        .exec();

      const nextID = maxDoc ? maxDoc.id + 1 : 1;
      user.set('id', nextID);
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

module.exports = mongoose.model('User', userSchema);