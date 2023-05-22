const express = require('express');
const escapeHtml = require('escape-html');
const {
  getParadeParticipationCategoryByName,
  deleteParadeParticipationCategory,
} = require('../../../repository/paradeParticipationCategory');

const router = express.Router();

router.use(express.json());

router.post('/', async (req, res) => {
  const { _id } = req.body;
  try {
    const paradeParticipationCategory = await getParadeParticipationCategoryByName(_id);
    if (paradeParticipationCategory) {
      await deleteParadeParticipationCategory(paradeParticipationCategory);
      return res.status(200).send('Parade category deleted successfully.');
    }
    return res.status(404).send('Parade category doesn\'t exist.');
  } catch (err) {
    return res.status(500).send(`Could not delete parade category: ${escapeHtml(err)}.`);
  }
});

module.exports = router;
