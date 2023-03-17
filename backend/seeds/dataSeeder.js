const seedRoles = require('./rolesSeeder');
const seedUsers = require('./userSeeder');

const seeder = async () => {
  await seedRoles();
  await seedUsers();
};

seeder();
console.log('Seed data checked');
