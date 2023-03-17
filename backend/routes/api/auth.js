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
