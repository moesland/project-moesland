const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();
const { getEventById, updateEventById } = require('../../../repository/event');

router.use(express.json());

router.post('/', [
  body('title').trim().isString().notEmpty(),
  body('description').trim().isString().notEmpty(),
  body('startdate').trim().isISO8601().notEmpty(),
  body('enddate').trim().isISO8601().notEmpty(),
  body('isParade').isBoolean().notEmpty(),
  body('radius').trim().isNumeric(),
  body().custom((value, { req }) => {
    const startdate = new Date(req.body.startdate);
    const enddate = new Date(req.body.enddate);
    if (startdate >= enddate) {
      throw new Error('Start date must be before end date');
    }
    return true;
  })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      id, title, description, startdate, enddate, location, isParade, latitude, longitude, radius
    } = req.body;
    const event = await getEventById(id);

    if (event) {
      await updateEventById(event._id, title, description, startdate, enddate, location, isParade, latitude, longitude, radius);
      return res.status(200).json('Event updated successfully!');
    }
    return res.status(404).json('Event not found.');
  } catch (err) {
    return res.status(500).json(`Could not update event: ${err}`);
  }
});

module.exports = router;
