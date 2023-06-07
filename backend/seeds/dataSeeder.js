// const seedNewsArticle = require('./newsArticleSeeder');
const seedRoles = require('./rolesSeeder');
const seedUsers = require('./userSeeder');
const seedEvents = require('./eventSeeder');
const seedVote = require('./voteSeeder');
const seedParadeCategories = require('./participationCategorySeeder');

const seeder = async () => {
  await seedRoles();
  await seedUsers();
  await seedEvents();
  await seedParadeCategories();
  // await seedNewsArticle();
  await seedVote();
};

seeder();
console.log('Seed data checked');
