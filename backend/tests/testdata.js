const mongoose = require('mongoose');
const Role = mongoose.model('Role');
const User = mongoose.model('User');
const AuthToken = mongoose.model('AuthToken');

const fakeUserData = {
    admin: {
        id: 10000,
        username: 'validadmin',
        password: 'validPassword',
        email: 'validadmin@valid.com',
        roleName: 'Admin'
    },
    superAdmin: {
        id: 10001,
        username: 'validSuperAdmin',
        password: 'validPassword',
        email: 'validSuperAdmin@valid.com',
        roleName: 'SuperAdmin'
    }
};

const createFakeUsers = async () => {
    const adminRole = await Role.findOne({ rolename: fakeUserData.admin.roleName });
    const superAdminRole = await Role.findOne({ rolename: fakeUserData.superAdmin.roleName });

    await removeFakeUsers();

    await new User({
        id: fakeUserData.admin.id,
        username: fakeUserData.admin.username,
        password: fakeUserData.admin.password,
        email: fakeUserData.admin.email,
        roleId: adminRole._id
    }).save();

    await new User({
        id: fakeUserData.superAdmin.id,
        username: fakeUserData.superAdmin.username,
        password: fakeUserData.superAdmin.password,
        email: fakeUserData.superAdmin.email,
        roleId: superAdminRole._id
    }).save();
};

const removeFakeUsers = async () => {
    await User.deleteMany({
        id: { $in: [fakeUserData.admin.id, fakeUserData.superAdmin.id] }
    });
};

const removeAuthToken = async () => {
    const fakeAdmin = await User.findOne({ username: fakeUserData.admin.username });
    const fakeSuperAdmin = await User.findOne({ username: fakeUserData.admin.username });

    if (!fakeAdmin && !fakeSuperAdmin) return console.log("Use removeAuthToken before removeFakeUsers()");

    await AuthToken.deleteMany({ userId: { $in: [fakeAdmin._id, fakeSuperAdmin._id] } })
}

module.exports = { fakeUserData, createFakeUsers, removeFakeUsers, removeAuthToken };