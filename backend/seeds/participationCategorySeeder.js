const mongoose = require('mongoose');

const ParticipationCategory = mongoose.model('ParticipationCategory');

const paradeCategoryData = [
  {
    name: 'Carnavalswagens',
    description: 'Alle carnavalswagens',
    color: '#00FF00', // Green
  },
  {
    name: 'Individueel',
    description: 'Individuele deelnames',
    color: '#0000FF', // Blue
  },
  {
    name: 'Grote loopgroep',
    description: 'Carnavalswagens kleiner dan x',
    color: '#FFFF00', // Yellow
  },
  {
    name: 'Kleine loopgroep',
    description: 'Carnavalswagens kleiner dan x',
    color: '#FF0000', // Red
  },
];

const seedParticipationCategory = async () => {
  await ParticipationCategory.find({}).then(async (categories) => {
    if (!categories.length) {
      console.log('\tNo parade categories found, filling seed data');
      await ParticipationCategory.insertMany(paradeCategoryData)
        .then(() => console.log('\tFilling parade categories seed data succesfull'))
        .catch((err) => console.log('\tFilling  parade categories seed data failed', err));
    }
  });
};

module.exports = async () => {
  await seedParticipationCategory();
};
