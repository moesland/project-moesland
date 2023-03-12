const express = require('express');
const router = express.Router();
const User = require('../../../models/user');

router.use(express.json());

router.post('/', async (req, res) => {
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