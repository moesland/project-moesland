const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();
const escapeHTML = require('escape-html');
const { getRoleByName } = require('../../../repository/role');
const { addUser, getUserByEmail, getUserByUsername } = require('../../../repository/user');

router.use(express.json());

/**
 * @swagger
 * /api/user/add:
 *   post:
 *     summary: Add a user
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - User
 *     requestBody:
 *       description: User object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - username
 *              - email
 *              - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: User username
 *               email:
 *                 type: string
 *                 description: User email
 *               password:
 *                 type: string
 *                 description: User password
 *     responses:
 *       200:
 *         description: User added successfully!
 *       500:
 *         description: Could not add user.
 *       401:
 *         description: Unauthorized.
 */
router.post('/', [
  body('username').trim().isString().notEmpty(),
  body('email').isEmail(),
  body('password').trim().notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const adminRole = await getRoleByName('Admin');
    const { username, email, password } = req.body;
    if (await getUserByUsername(username)) {
      return res.status(500).send(`username: ${escapeHTML(username)} already exist`);
    }

    if (await getUserByEmail(email)) {
      return res.status(500).send(`email: ${escapeHTML(email)} already exist`);
    }

    try {
      const newUser = await addUser(email, username, password, adminRole);
      return res.status(200).send(`User ${newUser.username} added successfully!`);
    } catch (err) {
      return res.status(500).send(`Could not add user: ${err}`);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send(`Could not add user: ${escapeHTML(err)}`);
  }
});

module.exports = router;
