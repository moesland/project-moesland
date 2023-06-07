const express = require('express');
const { authenticateToken, authenticateTokenRole } = require('../../middlewares/auth');
const { generateAuthToken } = require('../../services/auth.service');
const { getPreciseUser } = require('../../repository/user');

const router = express.Router();

router.use(express.json());

router.get('/', async (req, res) => {
  res.send('hello');
});

router.post('/validate', authenticateToken, async (req, res) => {
  res.status(200).json({ authorized: true });
});

router.post('/validate-role', authenticateTokenRole('SuperAdmin'), async (req, res) => { // testing route
  res.status(200).json({ authorized: true, role: 'SuperAdmin' });
});

// swagger
/**
 * @swagger
 * /api/auth:
 *   post:
 *     summary: Authenticate a user, generate a token you can use with the 'Authorize' button
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: User object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - username
 *              - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: User username
 *                 example: admin
 *               password:
 *                 type: string
 *                 description: User password
 *                 example: admin
 *     responses:
 *       200:
 *         description: Returns the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   description: User username
 *                 email:
 *                   type: string
 *                   description: User email
 *                 authToken:
 *                   type: string
 *                   description: User authToken
 *       400:
 *         description: Invalid username or password
 *       401:
 *         description: Invalid username or password
 */
router.post('/', async (req, res) => {
  const { username, password } = req.body;

  if (!username && !password) return res.status(400).json({ message: 'username and password required' });

  const user = await getPreciseUser(username, password);

  if (user) {
    const authToken = await generateAuthToken(user._id);
    return res.json({ username, email: user.email, authToken });
  }

  return res.status(401).json({ message: 'Invalid username or password' });
});

module.exports = router;
