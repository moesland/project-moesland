const mongoose = require('mongoose');

const Roles = mongoose.model('Role');

module.exports = {
  async getRoleById(roleId) {
    return Roles.findOne({ _id: { $eq: roleId } })
      .catch((err) => console.log('Cannot find role by id in Roles dataset', err));
  },
  async getRoleByName(roleName) {
    return Roles.findOne({ rolename: { $eq: roleName } })
      .catch((err) => console.log('Cannot find role by name in Roles dataset', err));
  },
};
