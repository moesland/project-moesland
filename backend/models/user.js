const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    index: true,
    primary: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    lowercase: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
  },
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
  },
});

userSchema.pre('save', async (next) => {
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
