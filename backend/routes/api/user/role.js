const express = require('express');

const router = express.Router();
const { getUserByUsername } = require('../../../repository/user');
const { getRoleById } = require('../../../repository/role');

router.use(express.json());

/**
 * @swagger
 * /api/user/role:
 *   get:
 *     summary: Get user role
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - User
 *     parameters:
 *       - name: username
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *
 *
 *     responses:
 *       200:
 *         description: User role
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/models/role'
 *       500:
 *         description: Could not get user.
 */
router.get('/', async (req, res) => {
  try {
    const { username } = req.query;

    const user = await getUserByUsername(username);
    const role = await getRoleById(user.roleId);

    res.status(200).json(role);
  } catch (err) {
    res.status(500).send('Could not get user.');
  }
});

module.exports = router;
