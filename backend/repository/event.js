const mongoose = require('mongoose');

const Event = mongoose.model('Event');
const sanitize = require('mongo-sanitize');

module.exports = {
  async getEventById(id) {
    return Event.findOne({ _id: { $eq: id } })
      .catch((err) => console.log('Cannot find events by id in Event dataset.', err));
  },
  async getEventByTitleAndDate(title, startdate) {
    const event = Event.findOne({
      title: { $eq: title },
      startdate: { $eq: startdate },
    }).catch((err) => {
      console.log('Cannot find events by title and date in Event dataset.', err);
    });
    return event;
  },
  async getAllEvents(onlyParades) {
    const query = onlyParades ? { isParade: true } : {};
    return Event.find(query)
      .catch((err) => console.error(err));
  },
  async getEventsByDate(date) {
    const start = new Date(date);
    const end = new Date(date);
    end.setDate(end.getDate() + 1);

    return Event.find({
      startdate: { $gte: start, $lt: end },
    }).catch((err) => console.error(err));
  },
  async createEvent(
    title,
    description,
    startdate,
    enddate,
    location,
    isParade,
    latitude,
    longitude,
    radius,
  ) {
    const newEvent = new Event({
      title,
      description,
      startdate,
      enddate,
      location,
      isParade,
      latitude,
      longitude,
      radius,
    });
    await newEvent.save();
  },
  async updateEventById(
    id,
    title,
    description,
    startdate,
    enddate,
    location,
    isParade,
    latitude,
    longitude,
    radius,
  ) {
    const cleanTitle = sanitize(title);
    const cleanDescription = sanitize(description);
    const cleanStartDate = sanitize(startdate);
    const cleanEndDate = sanitize(enddate);
    const cleanLocation = sanitize(location);
    const cleanisParade = sanitize(isParade);
    const cleanLatitude = sanitize(latitude);
    const cleanLongitude = sanitize(longitude);
    const cleanRadius = sanitize(radius);

    return Event.findOneAndUpdate(
      { _id: { $eq: id } },
      {
        title: cleanTitle,
        description: cleanDescription,
        startdate: cleanStartDate,
        enddate: cleanEndDate,
        location: cleanLocation,
        isParade: cleanisParade,
        latitude: cleanLatitude,
        longitude: cleanLongitude,
        radius: cleanRadius,
      },
      { new: true },
    )
      .catch((err) => {
        console.error(err);
      });
  },
  async deleteEvent(event) {
    return Event.deleteOne(event)
      .catch((err) => console.error(err));
  },
};
