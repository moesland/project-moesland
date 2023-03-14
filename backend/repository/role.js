const mongoose = require('mongoose');
const Roles = mongoose.model('Role');

module.exports = {
    getRoleById: async function (roleId) {
        return await Roles.findOne({_id: { $eq: roleId}})
            .catch(err => console.log("Cannot find role by id in Roles dataset", err));
    }
}