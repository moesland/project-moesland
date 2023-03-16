const express = require('express');

const router = express.Router();

router.use(express.json());

router.get('/', async (req, res) => {
  try {
    Location.find({})
      .then(() => res.json());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
