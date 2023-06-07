const mongoose = require('mongoose');

const Events = mongoose.model('Event');
const Participations = mongoose.model('Participation');
const ParticipationCategory = mongoose.model('ParticipationCategory');

const seedParticipation = async () => {
  const eventId = await Events.findOne({ title: 'Globaal Event XXL' })
    .then(async (event) => event._id);

  // opties: Individueel, Grote loopgroep, Kleine loopgroep, Carnavalswagens
  const categoryIds = await ParticipationCategory.find({})
    .then(async (categories) => {
      const categoryArray = {};

      categories.forEach((category) => {
        categoryArray[category.name] = category._id;
      });

      return categoryArray;
    });

  const participationData = [
    {
      startnumber: 1,
      name: 'Mister Special',
      category: categoryIds.Carnavalswagens,
      event: eventId,
    },
    {
      startnumber: 2,
      name: 'Miss Fantastic',
      category: categoryIds.Carnavalswagens,
      event: eventId,
    },
    {
      startnumber: 3,
      name: 'Captain Marvel',
      category: categoryIds.Carnavalswagens,
      event: eventId,
    },
    {
      startnumber: 4,
      name: 'The Flash',
      category: categoryIds.Individueel,
      event: eventId,
    },
    {
      startnumber: 5,
      name: 'Wonder Woman',
      category: categoryIds.Individueel,
      event: eventId,
    },
    {
      startnumber: 6,
      name: 'Superman',
      category: categoryIds.Individueel,
      event: eventId,
    },
    {
      startnumber: 7,
      name: 'Team Titans',
      category: categoryIds['Grote loopgroep'],
      event: eventId,
    },
    {
      startnumber: 8,
      name: 'Fantastic Four',
      category: categoryIds['Grote loopgroep'],
      event: eventId,
    },
    {
      startnumber: 9,
      name: 'X-Men United',
      category: categoryIds['Grote loopgroep'],
      event: eventId,
    },
    {
      startnumber: 10,
      name: 'Mini Avengers',
      category: categoryIds['Kleine loopgroep'],
      event: eventId,
    },
    {
      startnumber: 11,
      name: 'Incredibles Squad',
      category: categoryIds['Kleine loopgroep'],
      event: eventId,
    },
    {
      startnumber: 12,
      name: 'Guardians of the Galaxy',
      category: categoryIds['Kleine loopgroep'],
      event: eventId,
    },
  ];

  await Participations.find({}).then(async (participations) => {
    if (!participations.length) {
      console.log('\tNo participations found for global event, filling seed data');
      await Participations.insertMany(participationData)
        .then(() => console.log('\tFilling seed data succesfull'))
        .catch((err) => console.log('\tFilling seed data failed', err));
    }
  });
};

module.exports = async () => {
  await seedParticipation();
};
