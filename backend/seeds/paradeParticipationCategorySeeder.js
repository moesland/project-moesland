const mongoose = require('mongoose');

const ParadeParticipationCategory = mongoose.model('ParadeParticipationCategory');

const paradeCategoryData = [
  {
    name: 'Grote carnavalswagens',
    description: 'Carnavalswagens groter dan x',
    color: '#00FF00', // Green
  },
  {
    name: 'Kleine carnavalswagens',
    description: 'Carnavalswagens kleiner dan x',
    color: '#FF0000', // Red
  },
  {
    name: 'Loopgroepen',
    description: 'Loopgroepen met meerdere personen',
    color: '#0000FF', // Blue
  },
  {
    name: 'Loepgroepen van één persoon',
    description: 'Loopgroepen met één persoon',
    color: '#FF00FF', // Pink
  },
];

const seedParadeParticipationCategory = async () => {
  await ParadeParticipationCategory.find({}).then(async (categories) => {
    if (!categories.length) {
      console.log('\tNo parade categories found, filling seed data');
      await ParadeParticipationCategory.insertMany(paradeCategoryData)
        .then(() => console.log('\tFilling parade categories seed data succesfull'))
        .catch((err) => console.log('\tFilling  parade categories seed data failed', err));
    }
  });
};

module.exports = async () => {
  await seedParadeParticipationCategory();
};
