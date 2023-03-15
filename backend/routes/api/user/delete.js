const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../../../models/user');

router.use(express.json());

router.post('/', [
    body('email').isEmail()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    await User.deleteOne({ email: email })
        .then(() => {
            res.status(201).send(`User deleted successfully!`);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send(`Could not delete user: ${err}`);
        });
});

module.exports = router;