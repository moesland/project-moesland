const Role = require('../models/role');
const User = require('../models/user');

const seedUsers = async () => {
  try {
    const superAdminRole = await Role.findOne({ rolename: 'Super Admin' });
    const adminRole = await Role.findOne({ rolename: 'Admin' });

    const existingSuperAdminUser = await User.findOne({ id: 1 });
    if (existingSuperAdminUser) {
      console.log(`User '${existingSuperAdminUser.username}' already exists and has been deleted.`);
      await User.deleteOne({ _id: existingSuperAdminUser._id })
    }
    const newSuperAdminUser = new User({
      id: 1,
      username: 'Super Admin',
      password: 'superadmin123',
      email: 'superadmin@hotmail.com',
      roleId: superAdminRole._id
    });   
    await newSuperAdminUser.save();

    const existingAdminUser = await User.findOne({ id: 2 });
    if (existingAdminUser) {
      console.log(`User '${existingAdminUser.username}' already exists and has been deleted.`);
      await User.deleteOne({ _id: existingAdminUser._id })
    } 
    const newAdminUser = new User({
      id: 2,
      username: 'Admin',
      password: 'admin123',
      email: 'admin@hotmail.com',
      roleId: adminRole._id
    });
    await newAdminUser.save();

    console.log('Users seeded successfully');
  } catch (err) {
    console.error(err);
  }
};

module.exports = seedUsers;