const express = require('express');
const { getAllEvents, getEventsByDate } = require('../../../repository/event');

const router = express.Router();

router.use(express.json());

router.get('/', async (req, res) => {
    try {
        const { date } = req.query;

        if (date) {
            const events = await getEventsByDate(date)
            console.log(events);
            return res.status(200).json(await getEventsByDate(date));
        }

        res.status(200).json(await getAllEvents());
    } catch (err) {
        res.status(500).send("Error fetching events");
    }
});

module.exports = router;
