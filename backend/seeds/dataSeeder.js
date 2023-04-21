const seedNewsArticle = require('./newsArticleSeeder');
const seedRoles = require('./rolesSeeder');
const seedUsers = require('./userSeeder');

const seeder = async () => {
  await seedRoles();
  await seedUsers();
  // await seedNewsArticle();
};

seeder();
console.log('Seed data checked');
