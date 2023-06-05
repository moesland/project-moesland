const express = require('express');
const { body, validationResult } = require('express-validator');
const { getUserByEmail } = require('../../../repository/user');
const { deleteUser } = require('../../../repository/user');

const router = express.Router();

router.use(express.json());

/**
 * @swagger
 * /api/user/delete:
 *   post:
 *     summary: Delete a user
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
 *              - email
 *             properties:
 *               email:
 *                 type: string
 *                 description: User email
 *     responses:
 *       200:
 *         description: User deleted successfully!
 *       500:
 *         description: Could not delete user.
 *       401:
 *         description: Unauthorized.
 */
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
      return res.status(200).send('User deleted successfully!');
    }
    return res.status(500).send('Could not delete user.');
  } catch (err) {
    return res.status(500).send(`Could not delete user: ${err}`);
  }
});

module.exports = router;
