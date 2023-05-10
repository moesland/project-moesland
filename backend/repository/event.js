const mongoose = require('mongoose');
const Event = mongoose.model('Event');

module.exports = {
    async getEventById(id) {
        return await Event.findById({ _id: { $eq: id } })
            .catch(err => console.log("Cannot find events by id in Event dataset.", err));
    },
    async getEventByTitleAndDate(title, startdate) {
        const event = await Event.findOne({
            title: { $eq: title },
            startdate: { $eq: startdate }
        }).catch((err) => {
            console.log("Cannot find events by title and date in Event dataset.", err);
        });
        return event;
    },
    async getAllEvents() {
        return await Event.find({})
            .catch(err => console.error(err));
    },
    async getEventsByDate(date) {
        const start = new Date(date);
        const end = new Date(date);
        end.setDate(end.getDate() + 1);

        return await Event.find({
            startdate: { $gte: start, $lt: end }
        }).catch(err => console.error(err));
    },
    async createEvent(title, description, startdate, enddate, location) {
        const newEvent = new Event({
            title: title,
            description: description,
            startdate: startdate,
            enddate: enddate,
            location: location
        });
        await newEvent.save();
    },
    async updateEventById(id, title, description, startdate, enddate, location) {
        return await Event.findOneAndUpdate(
            { _id: { $eq: id } },
            {
                title: title,
                description: description,
                startdate: startdate,
                enddate: enddate,
                location: location
            }, { new: true })
            .catch((err) => {
                console.error(err);
            });
    },
    async deleteEvent(event) {
        return await Event.deleteOne(event)
            .catch(err => console.error(err));
    }
};