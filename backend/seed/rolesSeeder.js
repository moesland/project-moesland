const Role = require('../models/role');

const seedRoles = async () => {
  try {
    const superAdminRole = new Role({
      id: 1,
      rolename: 'Super Admin',
    });   
    
    const existingSuperAdminRole = await Role.findOne({ rolename: superAdminRole.rolename });
    if (existingSuperAdminRole) {
      await Role.deleteOne({ _id: existingSuperAdminRole._id });
      console.log(`Role '${existingSuperAdminRole.rolename}' already exists and has been deleted.`);
    }
    await superAdminRole.save();

    const adminRole = new Role({
      id: 2,
      rolename: 'Admin',
    });

    const existingAdminRole = await Role.findOne({ rolename: adminRole.rolename });
    if (existingAdminRole) {
      await Role.deleteOne({ _id: existingAdminRole._id });
      console.log(`Role '${existingAdminRole.rolename}' already exists and has been deleted.`);
    }
    await adminRole.save();

    console.log('Roles seeded successfully');
  } catch (err) {
    console.error(err);
  }
};

module.exports = seedRoles;