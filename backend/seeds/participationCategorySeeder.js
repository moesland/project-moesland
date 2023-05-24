const mongoose = require('mongoose');

const ParticipationCategory = mongoose.model('ParticipationCategory');

const paradeCategoryData = [
  {
    name: 'Carnavalswagens',
    description: 'Alle carnavalswagens',
    color: '#7ED321', // Green
  },
  {
    name: 'Individueel',
    description: 'Individuele deelnames',
    color: '#4A90E2', // Blue
  },
  {
    name: 'Grote loopgroep',
    description: 'Loopgroep met meer dan x personen',
    color: '#F8E71C', // Yellow
  },
  {
    name: 'Kleine loopgroep',
    description: 'Loopgroep met minder dan x personen',
    color: '#D0021B', // Red
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
