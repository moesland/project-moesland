const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = {
  async getPreciseUser(username, password) {
    const user = await User.findOne({ username: { $eq: username } });

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
  async getAllUsers() {
    return User.find().populate('roleId')
      .catch((err) => console.log('Cannot find list of users', err));
  },
  async getUserById(userId) {
    return User.findById(userId)
      .catch((err) => console.log('Cannot find user by id in User dataset', err));
  },
  async getUserByUsername(username) {
    return User.findOne({ username: { $eq: username } })// .find()is de lijst
      .catch((err) => console.error(err));
  },
  async getUserByEmail(email) {
    return User.findOne({ email: { $eq: email } })// .find()is de lijst
      .catch((err) => console.error(err));
  },
  async addUser(email, username, password, adminRole) {
    return User.create({
      password, email, username, roleId: adminRole._id,
    })
      .catch((err) => {
        console.error(err.message);
      });
  },
  async updateUserByEmail(email, username, password) {
    return User.findOneAndUpdate({ email: { $eq: email } }, { username, password }, { new: true })
      .catch((err) => {
        console.error(err);
      });
  },
  async deleteUser(user) {
    return User.deleteOne(user)
      .catch((err) => {
        console.error(err);
      });
  },
};
