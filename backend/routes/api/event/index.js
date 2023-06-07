const express = require('express');
const { getAllEvents, getEventsByDate } = require('../../../repository/event');

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
      await getEventsByDate(date);
      return res.status(200).json(await getEventsByDate(date));
    }

    return res.status(200).json(await getAllEvents(req.query));
  } catch (err) {
    return res.status(500).send('Error fetching events');
  }
});

module.exports = router;
