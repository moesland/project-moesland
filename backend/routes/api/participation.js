const express = require('express');
const { authenticateTokenRole, authenticateToken } = require('../../middlewares/auth');
const { body, validationResult } = require('express-validator');
const participationRepo = require('../../repository/participation');

const router = express.Router();

router.use(express.json());

router.get('/', async (req, res) => {
  res.status(200).json(await participationRepo.getAll(req.query));
});

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
