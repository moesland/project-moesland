const express = require('express');
const router = express.Router();
const { getUserByUsername } = require('../../../repository/user');
const { getRoleById } = require('../../../repository/role');

router.use(express.json());

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