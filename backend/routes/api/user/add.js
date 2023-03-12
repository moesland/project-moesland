const express = require('express');
const router = express.Router();
const User = require('../../../models/user');
const Role = require('../../../models/role');

router.use(express.json());

router.post('/', async (req, res) => {
    try {
        const adminRole = await Role.findOne({ rolename: 'Admin' });

        const { username, email, password } = req.body;
        const newUser = new User({
            password: password,
            email: email,
            username: username,
            roleId: adminRole._id
        });
    
        try {
            await newUser.save();
            res.status(201).send(`User ${newUser} added successfully!`);
        } catch (err) {
            console.error(err.message);
            res.status(500).send(`Could not add user ${newUser}: ${err}`);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send(`Could not add user: ${err}`);
    }
});

module.exports = router;