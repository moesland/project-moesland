const express = require('express');
const { body, validationResult } = require('express-validator');
const participationRepo = require('../../repository/paticipation');

const router = express.Router();

router.use(express.json());

router.get('/', async (req, res) => {
  res.status(200).json(await participationRepo.getAll());
});

router.post('/', [
  body('startnumber').isNumeric().notEmpty(),
  body('name').notEmpty(),
  body('category').isMongoId().notEmpty(),
  body('event').isMongoId().notEmpty(),
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
    return next(err);
  }
});

router.put('/:id', [
  body('startnumber').optional().isNumeric(),
  body('name').optional(),
  body('category').optional().isMongoId(),
  body('event').optional().isMongoId(),
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

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedParticipation = await participationRepo.remove(id);
    if (!deletedParticipation) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    return res.sendStatus(204);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
