const express = require('express');
const { body, validationResult } = require('express-validator');
const { getUserByEmail } = require('../../../repository/user');
const { deleteUser } = require('../../../repository/user');

const router = express.Router();

router.use(express.json());

router.post('/', [
  body('email').isEmail(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (user) {
      await deleteUser(user);
      res.status(200).send('User deleted successfully!');
    } else {
      res.status(500).send('Could not delete user.');
    }
  } catch (err) {
    res.status(500).send(`Could not delete user: ${err}`);
  }
});

module.exports = router;
