const express = require('express');
const escapeHtml = require('escape-html');
const { getEventById, deleteEvent } = require('../../../repository/event');

const router = express.Router();

router.use(express.json());

router.post('/', async (req, res) => {
  const { _id } = req.body;
  try {
    const event = await getEventById(_id);
    if (event) {
      await deleteEvent(event);
      return res.status(200).send('Event deleted successfully!');
    }
    return res.status(404).send('Event doesn\'t exist.');
  } catch (err) {
    return res.status(500).send(`Could not delete event: ${escapeHtml(err)}`);
  }
});

module.exports = router;
