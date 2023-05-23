const express = require('express');
const { getAllEvents, getEventsByDate } = require('../../../repository/event');

const router = express.Router();

router.use(express.json());

router.get('/', async (req, res) => {
  try {
    const { date } = req.query;

    if (date) {
      await getEventsByDate(date);
      return res.status(200).json(await getEventsByDate(date));
    }

    return res.status(200).json(await getAllEvents(req.query));
  } catch (err) {
    return res.status(500).send('Error fetching events');
  }
});

module.exports = router;
