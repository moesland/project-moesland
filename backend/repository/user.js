const mongoose = require('mongoose');

const Users = mongoose.model('User');

module.exports = {
  async getPreciseUser(username, password) {
    const user = await Users.findOne({ username: { $eq: username } });

    if (!user) {
      return null;
    }

    const isPasswordMatch = user.password === password;
    // const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return null;
    }

    return user;
  },
  async getUserById(userId) {
    return Users.findById(userId)
      .catch((err) => console.log('Cannot find user by id in User dataset', err));
  },
};
