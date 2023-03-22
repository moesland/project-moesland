const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = {
    getPreciseUser: async function (username, password) {
        const user = await User.findOne({ username: { $eq: username } })

        if (!user) {
            return null;
        }

        const isPasswordMatch = user.password == password;
        //const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return null;
        }

        return user;
    },
    getUserById: async function (userId) {
        return await User.findById(userId)
            .catch(err => console.log("Cannot find user by id in User dataset", err));
    },
    getUserByEmail: async function (email) {
        return await User.findOne({ email: { $eq: email } })
            .catch(err => console.error(err));
    },
    addUser: async function (email, username, password, adminRole) {
        const newUser = new User({
            password: password,
            email: email,
            username: username,
            roleId: adminRole._id
        });

        return await newUser.save()
            .catch((err) => {
                console.error(err.message);
            });
    },
    updateUserByEmail: async function (email, username, password) {
        return await User.findOneAndUpdate(
            { email: { $eq: email } }, { username: { $eq: username }, password: { $eq: password } }, { new: true })
            .catch((err) => {
                console.error(err);
            });
    },
    deleteUser: async function (user) {
        return await User.deleteOne(user)
            .catch((err) => {
                console.error(err);
            });
    },
};
