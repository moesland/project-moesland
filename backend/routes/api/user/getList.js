const express = require('express');
const { getAllUsers } = require('../../../repository/user');

const router = express.Router();

router.use(express.json());

/**
 * @swagger
 * /api/user/get-list:
 *   get:
 *     summary: Get all users
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - User
 *
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/models/user'
 *       500:
 *         description: Could not find users.
 */
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
