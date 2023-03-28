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
    getAllUsers: async function ()
    {
        return await User.find()
        .catch(err => console.log("Cannot find list of users", err));
    },
    getUserById: async function (userId) {
        return await User.findById(userId)
            .catch(err => console.log("Cannot find user by id in User dataset", err));
    },
    getUserByUsername: async function (username) {
        return await User.findOne({ username: { $eq: username } })//.find()is de lijst
            .catch(err => console.error(err));
    },
    getUserByEmail: async function (email) {
        return await User.findOne({ email: { $eq: email } })//.find()is de lijst
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
            { email: { $eq: email } }, { username: username , password: password}, { new: true })
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
