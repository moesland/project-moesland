const express = require('express');
const router = express.Router();
const User = require('../../../models/user');

router.use(express.json());

router.post('/', async (req, res) => {
    try {
        const { email, username, password } = req.body;

        const updatedUser = await User.findOneAndUpdate({ email: email }, { username: username, password: password }, { new: true });

        if (!updatedUser) {
            return res.status(404).send(`Could not find user with email ${email}.`);
        }

        return res.status(200).send(`User ${updatedUser.username} updated successfully!`);
    } catch (err) {
        console.log(err);
        res.status(500).send(`Could not update user: ${err}`);
    }
});

module.exports = router;