const mongoose = require('mongoose');

const Roles = mongoose.model('Role');

module.exports = {
    getRoleById: async function (roleId) {
        return await Roles.findOne({ _id: { $eq: roleId } })
            .catch(err => console.log("Cannot find role by id in Roles dataset", err));
    },
    getRoleByName: async function (roleName) {
        return await Roles.findOne({ rolename: { $eq: roleName } })
            .catch(err => console.log("Cannot find role by name in Roles dataset", err));
    }
}
