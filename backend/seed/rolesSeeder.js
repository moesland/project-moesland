const mongoose = require('mongoose');
const Role = mongoose.model('Role');

const roles_data = [
  {
    id: 1,
    rolename: 'Super Admin'
  },
  {
    id: 2,
    rolename: 'Admin'
  }
]

const seedRoles = async () => {
  Role.find({}).then(roles => {
      if(!roles.length){
          console.log('\tNo roles found, filling seed data');
          Role.insertMany(roles_data)
              .then(() => console.log('\tFilling roles seed data succesfull'))
              .catch(err => console.log('\tFilling roles seed data failed', err));
      }
  });
}

module.exports = async () => {
  await seedRoles();
};