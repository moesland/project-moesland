const express = require('express');
const router = express.Router();
const User = require('../../../models/user');

router.use(express.json());

router.post('/', (req, res) => {
    const { id, password, email, username, roleId } = req.body;
  
    const user = new User({
      id,
      password,
	  email,
	  username,
	  roleId
    });
  
    user.save()
      .then(savedUser => {
        res.status(200).send(`User ${savedUser.username} saved successfully`);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Error saving user');
      });
  });

module.exports = router;