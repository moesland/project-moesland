const mongoose = require('mongoose');

const Events = mongoose.model('Event');

function getDate(daysToAdd) {
  const today = new Date();
  const futureDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + daysToAdd);
  return futureDate;
}
const today = new Date();
const tomorrow = getDate(2);
const dayAfterTomorrow = getDate(3);
const dayAfterTheDayAfterTomorrow = getDate(4);

const eventData = [
  {
    title: 'Pronkzitting',
    description: 'Een jaarlijks terugkerend avondvullend programma waar het publiek door Schaijkse rasartiesten vermaakt wordt. De artiesten zijn Schaijkse mensen die met eigen teksten of eigen liedjes Schaijkse gebeurtenissen op de korrel nemen en het publiek weten te boeien. De voorbereidingen nemen lang van te voren hun aanvang, zo ongeveer bij de opening van het jaarlijkse carnaval, zijnde het 11-11 bal. Op de eerste bijeenkomst met artiesten en commissie wordt de opzet doorgesproken en gekeken wie er mee wil doen en wat voor ideeën er zijn.',
    startdate: today,
    enddate: tomorrow,
    location: 'Stamcafe van Schaijk',
    isParade: false
  },
  {
    title: 'Optocht Moesland',
    description: 'Een optocht om nooit te vergeten in het centrum van Schaijk',
    startdate: dayAfterTomorrow,
    enddate: dayAfterTheDayAfterTomorrow,
    isParade: true,
    latitude: 51.74583,
    longitude: 5.63194,
    radius: 300
  },
];

const seedEvents = async () => {
  await Events.find({}).then(async (events) => {
    if (!events.length) {
      console.log('\tNo events found, filling seed data');
      await Events.insertMany(eventData)
        .then(() => console.log('\tFilling events seed data succesfull'))
        .catch((err) => console.log('\tFilling events seed data failed', err));
    }
  });
};

module.exports = async () => {
  await seedEvents();
};
