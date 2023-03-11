const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const AuthToken = require('../../../models/authToken');

router.use(express.json());

router.post('/', [
    body('token').escape().trim().notEmpty(),
    body('expiredate').escape().trim().isISO8601(),
    body('userId').escape().trim().isAlphanumeric().notEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
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
