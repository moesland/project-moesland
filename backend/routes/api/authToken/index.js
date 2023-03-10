const express = require('express');
const router = express.Router();
const AuthToken = require('../../../models/authToken');

router.use(express.json());

router.post('/', (req, res) => {
    const { token, expiredate, userId } = req.body;
  
    const authToken = new AuthToken({
      token,
      expiredate,
      userId
    });
  
    authToken.save()
      .then(savedAuthToken => {
        res.status(200).send(`Authtoken ${token} saved successfully`);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Error saving authToken');
      });
  });

module.exports = router;