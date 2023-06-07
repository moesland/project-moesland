const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();
const { getEventById, updateEventById } = require('../../../repository/event');

router.use(express.json());

/**
 * @swagger
 * /api/event/update:
 *   post:
 *     summary: Update an event
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
 *              - id
 *              - title
 *              - description
 *              - startdate
 *              - enddate
 *              - isParade
 *             properties:
 *               id:
 *                 type: string
 *                 description: Event id
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
 *     responses:
 *       200:
 *         description: Event updated
 *       400:
 *         description: Invalid event
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/', [
  body('title').trim().isString().notEmpty(),
  body('description').trim().isString().notEmpty(),
  body('startdate').trim().isISO8601().notEmpty(),
  body('enddate').trim().isISO8601().notEmpty(),
  body('isParade').isBoolean().notEmpty(),
  body('radius').trim().isNumeric().optional(),
  body().custom((value, { req }) => {
    const startdate = new Date(req.body.startdate);
    const enddate = new Date(req.body.enddate);
    if (startdate >= enddate) {
      throw new Error('Start date must be before end date');
    }
    return true;
  }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      id, title, description, startdate, enddate, location, isParade, latitude, longitude, radius,
    } = req.body;
    const event = await getEventById(id);

    if (event) {
      await updateEventById(
        event._id,
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

      return res.status(200).json('Event updated successfully!');
    }
    return res.status(404).json('Event not found.');
  } catch (err) {
    return res.status(500).json(`Could not update event: ${err}`);
  }
});

module.exports = router;
