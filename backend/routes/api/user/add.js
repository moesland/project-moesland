const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../../../models/user');
const Role = require('../../../models/role');

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
        const adminRole = await Role.findOne({ rolename: 'Admin' });

        const { username, email, password } = req.body;
        const newUser = new User({
            password: password,
            email: email,
            username: username,
            roleId: adminRole._id
        });

        await newUser.save()
            .then(() => {
                res.status(201).send(`User ${username} added successfully!`);
            })
            .catch((err) => {

                console.error(err.message);
                res.status(500).send(`Could not add user ${username}: ${err}`);
            })
    }
    catch (err) {
        console.error(err);
    }
});

module.exports = router;