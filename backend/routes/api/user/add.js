const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const { getRoleByName } = require('../../../repository/role');
const { addUser } = require('../../../repository/user');

router.use(express.json());

router.post('/', [
    body('username').trim().isString().notEmpty(),
    body('email').isEmail(),
    body('password').trim().notEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const adminRole = await getRoleByName('Admin');

        const { username, email, password } = req.body;

        try {
            const newUser = await addUser(email, username, password, adminRole);
            res.status(200).send(`User ${newUser.username} added successfully!`);
        } catch (err) {
            res.status(500).send(`Could not update user: ${err}`);
        }
    }
    catch (err) {
        console.error(err);
    }
});

module.exports = router;