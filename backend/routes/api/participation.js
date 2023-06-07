const express = require('express');
const { body, validationResult } = require('express-validator');
const { authenticateToken } = require('../../middlewares/auth');
const participationRepo = require('../../repository/participation');

const router = express.Router();

router.use(express.json());

/**
 * @swagger
 * /api/participation:
 *   get:
 *     summary: Get all participations
 *     tags:
 *       - Participation
 *     parameters:
 *       - name: startnumber
 *         in: query
 *         required: false
 *         schema:
 *           type: number
 *       - name: name
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *       - name: category
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *       - name: event
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Participations
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/models/participation'
 *       500:
 *         description: Could not get participations.
 */
router.get('/', async (req, res) => {
  res.status(200).json(await participationRepo.getAll(req.query));
});


/**
 * @swagger
 * /api/participation:
 *   post:
 *     summary: Add a participation
 *     tags:
 *       - Participation
 *     requestBody:
 *       description: Participation object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - startnumber
 *              - name
 *              - category
 *              - event
 *             properties:
 *               startnumber:
 *                 type: number
 *                 description: Participation start number
 *               name:
 *                 type: string
 *                 description: Participation name
 *               category:
 *                 type: string
 *                 description: Participation category
 *               event:
 *                 type: string
 *                 description: Participation event
 *     responses:
 *       201:
 *         description: Participation added successfully!
 *       400:
 *         description: Bad request.
 *       422:
 *         description: Could not add participation.
 */
router.post('/', authenticateToken, [
  body('startnumber').isNumeric().notEmpty().withMessage('Start number must be a non-empty number'),
  body('name').notEmpty().withMessage('Name must not be empty'),
  body('category').isMongoId().notEmpty().withMessage('Category must be a non-empty MongoDB ID'),
  body('event').isMongoId().notEmpty().withMessage('Event must be a non-empty MongoDB ID'),
], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newParticipation = req.body;
    const createdParticipation = await participationRepo.add(newParticipation);
    return res.status(201).json(createdParticipation);
  } catch (err) {
    res.status(422).json(err);
    return next(err);
  }
});

router.put('/:id', authenticateToken, [
  body('startnumber').optional().isNumeric().withMessage('Start number must be a number'),
  body('name').optional().notEmpty().withMessage('Name must not be empty'),
  body('category').optional().isMongoId().withMessage('Category must be a MongoDB ID'),
  body('event').optional().isMongoId().withMessage('Event must be a MongoDB ID'),
], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const newParticipation = req.body;
    const updatedParticipation = await participationRepo.update(id, newParticipation);
    return res.status(200).json(updatedParticipation);
  } catch (err) {
    return next(err);
  }
});

router.delete('/:id', authenticateToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedParticipation = await participationRepo.remove(id);
    if (!deletedParticipation) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    return res.status(200).json(deletedParticipation);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
