const express = require('express');
const { body, validationResult } = require('express-validator');
const voteRepository = require('../../repository/vote');

const router = express.Router();

router.use(express.json());

router.get('/', async (req, res) => {
  try {
    const votes = await voteRepository.getAll(req.query);
    res.status(200).json(votes);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', [
  body('deviceId').notEmpty().withMessage('Device ID must not be empty'),
  body('category').isMongoId().notEmpty().withMessage('Category must be a non-empty MongoDB ID'),
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

router.put('/:id', [
  body('timestamp').notEmpty().isDate().withMessage('Timestamp should be a valid date'),
  body('deviceId').notEmpty().withMessage('Device ID must not be empty'),
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
