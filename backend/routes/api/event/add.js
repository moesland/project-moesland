const express = require('express');

const router = express.Router();
const { body, validationResult } = require('express-validator');
const { createEvent, getEventByTitleAndDate } = require('../../../repository/event');
const auth = require('../../../middlewares/auth');

router.use(express.json());

router.get('/', async (req, res) => {
  res.send('Event aanmaken');
});

router.post('/', [
  body('title').trim().isString().notEmpty(),
  body('description').trim().isString().notEmpty(),
  body('startdate').trim().isISO8601().notEmpty(),
  body('enddate').trim().isISO8601().notEmpty(),
  body('location').trim().notEmpty(),
  body().custom((value, { req }) => {
    const startdate = new Date(req.body.startdate);
    const enddate = new Date(req.body.enddate);
    if (startdate >= enddate) {
      throw new Error('Start date must be before end date');
    }
    return true;
  }),
], auth.authenticateToken, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const {
      title, description, startdate, enddate, location,
    } = req.body;

    const event = await getEventByTitleAndDate(title, startdate);

    if (!event) {
      await createEvent(title, description, startdate, enddate, location);
      return res.status(201).send('Event created successfully!');
    }
    return res.status(409).send('Event already exists on this startdate');
  } catch (err) {
    return res.status(500).send(`Could not create event: ${err}`);
  }
});

module.exports = router;
