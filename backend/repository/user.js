const mongoose = require('mongoose');

const User = mongoose.model('User');
const sanitize = require('mongo-sanitize');

module.exports = {
    async getPreciseUser(username, password) {
        const user = await User.findOne({ username: { $eq: username } })
        if (!user) {
            return null;
        }

        //const isPasswordMatch = await bcrypt.compare(password, user.password);
        return user.password == password ? user : null;
    },
    async getAllUsers() {
        return await User.find().populate("roleId")
            .catch(err => console.log("Cannot find list of users", err));
    },
    async getUserById(userId) {
        return await User.findOne({ _id: { $eq: userId } })
            .catch(err => console.log("Cannot find user by id in User dataset", err));
    },
    async getUserByUsername(username) {
        return await User.findOne({ username: { $eq: username } })
            .catch(err => console.error(err));
    },
    async getUserByEmail(email) {
        return await User.findOne({ email: { $eq: email } })
            .catch(err => console.error(err));
    },
    async addUser(email, username, password, adminRole) {
        return await User.create({ password: password, email: email, username: username, roleId: adminRole._id })
            .catch(err => console.error(err.message));
    },
    async updateUserByEmail(email, username, password) {
        const cleanUsername = sanitize(username);
        const cleanPassword = sanitize(password);

        return await User.findOneAndUpdate({ email: { $eq: email } }, { username: cleanUsername, password: cleanPassword }, { new: true })
            .catch(err => console.error(err));
    },
    async deleteUser(user) {
        return await User.deleteOne(user)
            .catch(err => console.error(err));
    }
};
