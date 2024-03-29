const mongoose = require('mongoose');

const Role = mongoose.model('Role');

const rolesData = [
  {
    id: 1,
    rolename: 'SuperAdmin',
  },
  {
    id: 2,
    rolename: 'Admin',
  },
];

const seedRoles = async () => {
  await Role.find({}).then(async (roles) => {
    if (!roles.length) {
      console.log('\tNo roles found, filling seed data');
      await Role.insertMany(rolesData)
        .then(() => console.log('\tFilling roles seed data succesfull'))
        .catch((err) => console.log('\tFilling roles seed data failed', err));
    }
  });
};

module.exports = async () => {
  await seedRoles();
};
