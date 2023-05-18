const express = require('express');
const participationRepo = require('../../repository/paticipation');

const router = express.Router();

router.use(express.json());

router.get('/', async (res) => {
  res.status(200).json(await participationRepo.getAll());
});

router.post('/', async (req, res, next) => {
  try {
    const newParticipation = req.body;
    const createdParticipation = await participationRepo.add(newParticipation);
    res.status(201).json(createdParticipation);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const newParticipation = req.body;
    const updatedParticipation = await participationRepo.update(id, newParticipation);
    res.status(200).json(updatedParticipation);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await participationRepo.remove(id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
