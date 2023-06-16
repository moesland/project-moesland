const express = require('express');
const escapeHtml = require('escape-html');
const { getEventById, deleteEvent } = require('../../../repository/event');
const { getAllExtra, bulkDelete } = require('../../../repository/vote');
const router = express.Router();

router.use(express.json());

/**
 * @swagger
 * /api/event/delete:
 *   post:
 *     summary: Delete an event
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
 *              - _id
 *             properties:
 *               _id:
 *                 type: string
 *                 description: Event id
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       404:
 *         description: Event doesn't exist
 *       500:
 *         description: Could not delete event
 */
router.post('/', async (req, res) => {
  const { _id } = req.body;
  try {
    const event = await getEventById(_id);    
    if (event) {
      const votes = await getAllExtra({ event: event._id });
      const voteIds = votes.map((vote) => vote._id);
      await bulkDelete(voteIds);
      await deleteEvent(event);
      return res.status(200).send('Event and associated votes deleted successfully!');
    }
    return res.status(404).send('Event doesn\'t exist.');
  } catch (err) {
    return res.status(500).send(`Could not delete event: ${escapeHtml(err)}`);
  }
});

module.exports = router;
