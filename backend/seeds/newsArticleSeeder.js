const mongoose = require('mongoose');

const NewsArticle = mongoose.model('NewsArticle');

const newsArticleData = [
  {
    date: new Date('2022-01-01'),
    title: "New Year's Day Celebrations",
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, ipsum in pulvinar aliquam, mauris velit volutpat mauris, sit amet eleifend lectus nunc eu augue. Sed ut lectus et mauris gravida malesuada. Praesent eu rutrum sapien, at auctor metus. Fusce vel sem ac nisi lobortis efficitur. Donec aliquam justo augue, vel mollis leo lobortis vitae.',
  },
  {
    date: new Date('2022-02-14'),
    title: "Valentine's Day Special",
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, ipsum in pulvinar aliquam, mauris velit volutpat mauris, sit amet eleifend lectus nunc eu augue. Sed ut lectus et mauris gravida malesuada. Praesent eu rutrum sapien, at auctor metus. Fusce vel sem ac nisi lobortis efficitur. Donec aliquam justo augue, vel mollis leo lobortis vitae.',
  },
  {
    date: new Date('2022-03-17'),
    title: "St. Patrick's Day Parade",
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, ipsum in pulvinar aliquam, mauris velit volutpat mauris, sit amet eleifend lectus nunc eu augue. Sed ut lectus et mauris gravida malesuada. Praesent eu rutrum sapien, at auctor metus. Fusce vel sem ac nisi lobortis efficitur. Donec aliquam justo augue, vel mollis leo lobortis vitae.',
  },
];

const seedNewsArticle = async () => {
  await NewsArticle.find({}).then(async (article) => {
    if (!article.length) {
      console.log('\tNo news article found, filling seed data');
      await NewsArticle.insertMany(newsArticleData)
        .then(() => console.log('\tFilling news article seed data succesfull'))
        .catch((err) => console.log('\tFilling news article seed data failed', err));
    }
  });
};

module.exports = async () => {
  await seedNewsArticle();
};
