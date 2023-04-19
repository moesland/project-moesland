const mongoose = require('mongoose');
const Events = mongoose.model('Event');

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const dayAfterTomorrow = new Date(today);
dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
const dayAfterTheDayAfterTomorrow = new Date(today);
dayAfterTheDayAfterTomorrow.setDate(dayAfterTheDayAfterTomorrow.getDate() + 3);

const eventData = [
  {
    title: 'Pronkzitting',
    description: 'Een jaarlijks terugkerend avondvullend programma waar het publiek door Schaijkse rasartiesten vermaakt wordt. De artiesten zijn Schaijkse mensen die met eigen teksten of eigen liedjes Schaijkse gebeurtenissen op de korrel nemen en het publiek weten te boeien. De voorbereidingen nemen lang van te voren hun aanvang, zo ongeveer bij de opening van het jaarlijkse carnaval, zijnde het 11-11 bal. Op de eerste bijeenkomst met artiesten en commissie wordt de opzet doorgesproken en gekeken wie er mee wil doen en wat voor ideeën er zijn.',
    startdate: today,
    enddate: tomorrow,
    location: 'Schaijk'
  },
  {
    title: 'Erewijn',
    description: 'Zaterdags voorafgaand aan de carnavalsdagen organiseert de gemeente Landerd de zgn. Erewijn. Tijdens de Erewijn krijgen de hoogheden van Schaijk, Zeeland en Reek officieel de sleutel van de diverse rijken overhandigd.',
    startdate: dayAfterTomorrow,
    enddate: dayAfterTheDayAfterTomorrow,
    location: 'Schaijk'
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
