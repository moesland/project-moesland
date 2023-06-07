const express = require('express');
const { getAllEvents, getEventsByDate, getOngoingEvents } = require('../../../repository/event');
const participationRepo = require('../../../repository/participation');

const router = express.Router();

router.use(express.json());

/**
 * @swagger
 * /api/event:
 *   get:
 *     summary: Get all events
 *     tags:
 *       - Event
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *         description: Date of the event
 *     responses:
 *       200:
 *         description: List of events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/models/event'
 */
router.get('/', async (req, res) => {
  try {
    const { date } = req.query;

    if (date) {
      return res.status(200).json(await getEventsByDate(date));
    }

    return res.status(200).json(await getAllEvents(req.query));
  } catch (err) {
    return res.status(500).send('Error fetching events');
  }
});

router.get('/participants', async (req, res) => {
  try {
    const date = new Date();
    const events = await getOngoingEvents(date);

    const updatedEvents = await Promise.all(events.map(async (event) => {
      const participates = await participationRepo.getAll({ event: event._id });
      const categories = [];

      participates.forEach((participate) => {
        const existingCategory = categories.find(
          (category) => category._id === participate.category._id,
        );

        if (!existingCategory) {
          const newCategory = { ...participate.category._doc, participates: [participate] };
          categories.push(newCategory);
        } else {
          existingCategory.participates.push(participate);
        }
      });

      return { ...event._doc, categories };
    }));

    return res.status(200).json(updatedEvents);
  } catch (err) {
    return res.status(500).send('Error fetching event participants');
  }
});

module.exports = router;
