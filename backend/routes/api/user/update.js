const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();
const escapeHtml = require('escape-html');
const { updateUserByEmail } = require('../../../repository/user');

router.use(express.json());

router.post('/', [
  body('username').trim().isString().notEmpty(),
  body('email').isEmail(),
  body('password').trim().notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, username, password } = req.body;

  try {
    const updatedUser = await updateUserByEmail(email, username, password);
    return res.status(200).send(`User ${updatedUser.username} updated successfully!`);
  } catch (err) {
    return res.status(500).send(`Could not update user: ${escapeHtml(err)}`);
  }
});

module.exports = router;
