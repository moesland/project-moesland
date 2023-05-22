const express = require('express');
const escapeHtml = require('escape-html');
const {
  getParticipationCategoryByName,
  deleteParticipationCategory,
} = require('../../../repository/participationCategory');

const router = express.Router();

router.use(express.json());

router.post('/', async (req, res) => {
  const { _id } = req.body;
  try {
    const participationCategory = await getParticipationCategoryByName(_id);
    if (participationCategory) {
      await deleteParticipationCategory(participationCategory);
      return res.status(200).send('Parade category deleted successfully.');
    }
    return res.status(404).send('Parade category doesn\'t exist.');
  } catch (err) {
    return res.status(500).send(`Could not delete parade category: ${escapeHtml(err)}.`);
  }
});

module.exports = router;
