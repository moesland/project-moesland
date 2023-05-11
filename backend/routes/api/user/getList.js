const express = require('express');
const { getAllUsers } = require('../../../repository/user');

const router = express.Router();

router.use(express.json());

router.get('/', async (req, res) => {
  try {
    const users = await getAllUsers();
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(500).send('could not find users');
    }
  } catch (err) {
    res.status(500).send(`Could not find users: ${err}`);
  }
});

module.exports = router;
