const mongoose = require('mongoose');
const authToken = require('../models/authToken');
const { removeAuthTokensById } = require('../repository/authToken');
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
    await AuthToken.deleteMany({ 
        userId: { $in: [fakeUserData.admin._id, fakeUserData.superAdmin._id] } 
    })
};

module.exports = { fakeUserData, createFakeUsers, removeFakeUsers };