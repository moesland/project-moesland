const mongoose = require('mongoose');

const Role = mongoose.model('Role');
const User = mongoose.model('User');

const superAdminSeed = async () => {
  const superAdminPassword = 'superadmin123';
  // const superAdminHash = await bcrypt.hash('superadmin123', Number(process.env.HASH_SALT));

  try {
    const superAdminRole = await Role.findOne({ rolename: 'SuperAdmin' });

    if (!await User.findOne({ username: 'SuperAdmin' })) {
      const newSuperAdminUser = new User({
        id: 1,
        username: 'SuperAdmin',
        password: superAdminPassword,
        email: 'superadmin@hotmail.com',
        roleId: superAdminRole._id,
      });
      await newSuperAdminUser.save();
    }
  } catch (err) {
    console.error(err);
  }
};

const adminSeed = async () => {
  const adminPassword = 'admin123';
  // const adminHash = await bcrypt.hash('admin123', Number(process.env.HASH_SALT));

  try {
    const adminRole = await Role.findOne({ rolename: 'Admin' });

    if (!await User.findOne({ username: 'Admin' })) {
      const newAdminUser = new User({
        id: 2,
        username: 'Admin',
        password: adminPassword,
        email: 'admin@hotmail.com',
        roleId: adminRole._id,
      });
      await newAdminUser.save();
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = async () => {
  await superAdminSeed();
  await adminSeed();
};
