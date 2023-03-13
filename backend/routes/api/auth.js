const express = require('express');
const { generateAuthToken } = require('../../services/auth.service');
const { getPreciseUser } = require('../../repository/user');
const { requestLimiter } = require('../../middleware/security');
const { body } = require('express-validator');
const router = express.Router();

router.use(express.json());

router.post('/', requestLimiter,
    body('username').notEmpty().trim().escape(),
    body('password').notEmpty().trim().escape(),
    async (req, res) => {
        const { username, password } = req.body;

        if (!username && !password) return res.status(400).json({ message: 'username and password required' })

        const user = await getPreciseUser(username, password);

        if (user) {
            const authToken = await generateAuthToken(user._id);
            return res.json({ username, email: user.email, authToken });
        }

        res.status(401).json({ message: 'Invalid username or password' });
    });


module.exports = router;