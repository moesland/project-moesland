const express = require('express');

const router = express.Router();
const { body, validationResult } = require('express-validator');
const { createEvent, getEventByTitleAndDate } = require('../../../repository/event');
const auth = require('../../../middlewares/auth');

router.use(express.json());

router.get('/', async (req, res) => {
  res.send('Event aanmaken');
});

/**
 * @swagger
 * /api/event/add:
 *   post:
 *     summary: Create a new event
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Event
 *     requestBody:
 *       description: Event object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - title
 *              - description
 *              - startdate
 *              - enddate
 *             properties:
 *               title:
 *                 type: string
 *                 description: Event title
 *               description:
 *                 type: string
 *                 description: Event description
 *               startdate:
 *                 type: string
 *                 description: Event startdate
 *               enddate:
 *                 type: string
 *                 description: Event enddate
 *               location:
 *                 type: string
 *                 description: Event location
 *               isParade:
 *                 type: boolean
 *                 description: Is the event a parade
 *               latitude:
 *                 type: number
 *                 description: Event latitude
 *               longitude:
 *                 type: number
 *                 description: Event longitude
 *               radius:
 *                 type: number
 *                 description: Event radius
 *             example:
 *               title: Event
 *               description: Event description
 *               startdate: 2023-02-19T11:11:00.000Z
 *               enddate: 2023-02-19T14:11:00.000Z
 *               location: Schaijk
 *               isParade: true
 *               latitude: 51.7433936
 *               longitude: 5.6270517
 *               radius: 200
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request
 *       409:
 *         description: Event already exists on this startdate
 *       500:
 *         description: Internal Server Error
 */
router.post('/', [
  body('title').trim().isString().notEmpty(),
  body('description').trim().isString().notEmpty(),
  body('startdate').trim().isISO8601().notEmpty(),
  body('enddate').trim().isISO8601().notEmpty(),
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
      title, description, startdate, enddate, location, isParade, latitude, longitude, radius,
    } = req.body;

    const event = await getEventByTitleAndDate(title, startdate);

    if (!event) {
      await createEvent(
        title,
        description,
        startdate,
        enddate,
        location,
        isParade,
        latitude,
        longitude,
        radius,
      );
      return res.status(201).send('Event created successfully!');
    }
    return res.status(409).send('Event already exists on this startdate');
  } catch (err) {
    return res.status(500).send(`Could not create event: ${err}`);
  }
});

module.exports = router;
