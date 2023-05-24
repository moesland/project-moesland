const express = require('express');
const escapeHtml = require('escape-html');
const {
  deleteParticipationCategory,
  getParticipationCategoryById,
} = require('../../../repository/participationCategory');

const router = express.Router();

router.use(express.json());

router.post('/', async (req, res) => {
  const { _id } = req.body;
  try {
    const participationCategory = await getParticipationCategoryById(_id);
    if (participationCategory) {
      await deleteParticipationCategory(participationCategory);
      return res.status(200).send('Participation category deleted successfully.');
    }
    return res.status(404).send('Participation category doesn\'t exist.');
  } catch (err) {
    return res.status(500).send(`Could not delete participation category: ${escapeHtml(err)}.`);
  }
});

module.exports = router;
