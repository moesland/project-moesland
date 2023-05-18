const express = require('express');
const { getAllParadeParticipationCategories } = require('../../../repository/paradeParticipationCategory');

const router = express.Router();

router.use(express.json());

router.get('/', async (req, res) => {
  try {
    return res.status(200).json(await getAllParadeParticipationCategories());
  } catch (err) {
    return res.status(500).send('Error fetching parade categories');
  }
});

module.exports = router;
