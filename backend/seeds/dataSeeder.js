const seedNewsArticle = require('./newsArticleSeeder');
const seedRoles = require('./rolesSeeder');
const seedUsers = require('./userSeeder');
const seedEvents = require('./eventSeeder');

const seeder = async () => {
  await seedRoles();
  await seedUsers();
  await seedEvents();
  //await seedNewsArticle();
};

seeder();
console.log('Seed data checked');
