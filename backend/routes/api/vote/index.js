const express = require('express');
const { body, validationResult } = require('express-validator');
const voteRepository = require('../../../repository/vote');

const router = express.Router();

router.use(express.json());

/**
 * @swagger
 * /api/vote:
 *   get:
 *     summary: Get all votes
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Vote
 *     parameters:
 *       - in: query
 *         name: deviceId
 *         schema:
 *           type: string
 *         description: Device ID
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Category ID
 *       - in: query
 *         name: event
 *         schema:
 *           type: string
 *         description: Event ID
 *       - in: query
 *         name: participant
 *         schema:
 *           type: string
 *         description: Participant ID
 *       - in: query
 *         name: timestamp
 *         schema:
 *           type: string
 *         description: Timestamp
 *     responses:
 *       200:
 *         description: Array of votes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 required:
 *                   - deviceId
 *                   - category
 *                   - event
 *                   - participant
 *                   - timestamp
 *                 properties:
 *                   deviceId:
 *                     type: string
 *                     description: Device ID
 *                   category:
 *                     type: string
 *                     description: Category ID
 *                   event:
 *                     type: string
 *                     description: Event ID
 *                   participant:
 *                     type: string
 *                     description: Participant ID
 *                   timestamp:
 *                     type: string
 *                     description: Timestamp
 *       500:
 *         description: Internal Server Error
 */
router.get('/', async (req, res) => {
  try {
    const votes = await voteRepository.getAll(req.query);
    res.status(200).json(votes);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * @swagger
 * /api/vote/extra:
 *   get:
 *     summary: Get all extra votes
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Vote
 *     parameters:
 *       - in: query
 *         name: deviceId
 *         schema:
 *           type: string
 *         description: Device ID
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Category ID
 *       - in: query
 *         name: event
 *         schema:
 *           type: string
 *         description: Event ID
 *       - in: query
 *         name: participant
 *         schema:
 *           type: string
 *         description: Participant ID
 *       - in: query
 *         name: timestamp
 *         schema:
 *           type: string
 *         description: Timestamp
 *     responses:
 *       200:
 *         description: Array of votes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 required:
 *                   - deviceId
 *                   - category
 *                   - event
 *                   - participant
 *                   - timestamp
 *                 properties:
 *                   deviceId:
 *                     type: string
 *                     description: Device ID
 *                   category:
 *                     type: string
 *                     description: Category ID
 *                   event:
 *                     type: string
 *                     description: Event ID
 *                   participant:
 *                     type: string
 *                     description: Participant ID
 *                   timestamp:
 *                     type: string
 *                     description: Timestamp
 *       500:
 *         description: Internal Server Error
 */
router.get('/extra', async (req, res) => {
  try {
    const votes = await voteRepository.getAllExtra(req.query);
    res.status(200).json(votes);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * @swagger
 * /api/vote:
 *   post:
 *     summary: Add a vote
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Vote
 *     requestBody:
 *       description: Vote object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - deviceId
 *              - category
 *              - event
 *              - participant
 *              - timestamp
 *             properties:
 *               deviceId:
 *                 type: string
 *                 description: Device ID
 *               category:
 *                 type: string
 *                 description: Category ID
 *               event:
 *                 type: string
 *                 description: Event ID
 *               participant:
 *                 type: string
 *                 description: Participant ID
 *               timestamp:
 *                 type: string
 *                 description: Timestamp
 *     responses:
 *       201:
 *         description: Created vote
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - deviceId
 *                 - category
 *                 - event
 *                 - participant
 *                 - timestamp
 *               properties:
 *                 deviceId:
 *                   type: string
 *                   description: Device ID
 *                 category:
 *                   type: string
 *                   description: Category ID
 *                 event:
 *                   type: string
 *                   description: Event ID
 *                 participant:
 *                   type: string
 *                   description: Participant ID
 *                 timestamp:
 *                   type: string
 *                   description: Timestamp
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/', [
  body('deviceId').notEmpty().withMessage('Device ID must not be empty'),
  body('category').isMongoId().notEmpty().withMessage('Category must be a non-empty MongoDB ID'),
  body('event').isMongoId().notEmpty().withMessage('event must be a non-empty MongoDB ID'),
  body('participant').isMongoId().notEmpty().withMessage('Participant must be a non-empty MongoDB ID'),
], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const createdVote = await voteRepository.add(req.body);
    return res.status(201).json(createdVote);
  } catch (err) {
    return next(err);
  }
});

/**
 * @swagger
 * /api/vote/{id}:
 *   put:
 *     summary: Update a vote
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Vote
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Vote ID
 *     requestBody:
 *       description: Vote object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - deviceId
 *              - category
 *              - event
 *              - participant
 *              - timestamp
 *             properties:
 *               deviceId:
 *                 type: string
 *                 description: Device ID
 *               category:
 *                 type: string
 *                 description: Category ID
 *               event:
 *                 type: string
 *                 description: Event ID
 *               participant:
 *                 type: string
 *                 description: Participant ID
 *               timestamp:
 *                 type: string
 *                 description: Timestamp
 *     responses:
 *       200:
 *         description: Updated vote
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - deviceId
 *                 - category
 *                 - event
 *                 - participant
 *                 - timestamp
 *               properties:
 *                 deviceId:
 *                   type: string
 *                   description: Device ID
 *                 category:
 *                   type: string
 *                   description: Category ID
 *                 event:
 *                   type: string
 *                   description: Event ID
 *                 participant:
 *                   type: string
 *                   description: Participant ID
 *                 timestamp:
 *                   type: string
 *                   description: Timestamp
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.put('/:id', [
  body('timestamp').notEmpty().isDate().withMessage('Timestamp should be a valid date'),
  body('deviceId').notEmpty().withMessage('Device ID must not be empty'),
  body('event').isMongoId().notEmpty().withMessage('event must be a non-empty MongoDB ID'),
  body('category').isMongoId().notEmpty().withMessage('Category must be a non-empty MongoDB ID'),
  body('participant').isMongoId().notEmpty().withMessage('Participant must be a non-empty MongoDB ID'),
], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const newVote = req.body;
    const updatedVote = await voteRepository.update(id, newVote);
    if (!updatedVote) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    return res.status(200).json(updatedVote);
  } catch (err) {
    return next(err);
  }
});

/**
 * @swagger
 * /api/vote/{id}:
 *   delete:
 *     summary: Delete a vote
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Vote
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Vote ID
 *     responses:
 *       200:
 *         description: Deleted vote
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - deviceId
 *                 - category
 *                 - event
 *                 - participant
 *                 - timestamp
 *               properties:
 *                 deviceId:
 *                   type: string
 *                   description: Device ID
 *                 category:
 *                   type: string
 *                   description: Category ID
 *                 event:
 *                   type: string
 *                   description: Event ID
 *                 participant:
 *                   type: string
 *                   description: Participant ID
 *                 timestamp:
 *                   type: string
 *                   description: Timestamp
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedVote = await voteRepository.remove(id);
    if (!deletedVote) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    return res.status(200).json(deletedVote);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
