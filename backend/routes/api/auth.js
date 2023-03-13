const express = require('express');
const { validateAuthToken, validateAuthTokenRole } = require('../../middleware/auth');
const { generateAuthToken } = require('../../services/auth.service');
const { getPreciseUser } = require('../../repository/user');
const { requestLimiter } = require('../../middleware/security');
const router = express.Router();

router.use(express.json());

router.get('/', async (req, res) => {
    res.send("hello");
});

router.post('/validate', validateAuthToken, async (req, res) => {
    res.status(200).json({ authorized: true });
});

router.post('/validate-middleware', validateAuthToken, async (req, res) => {
    res.status(200).json({ authorized: true });
});

router.post('/validate-middleware-role', validateAuthTokenRole("admin"), async (req, res) => {
    res.status(200).json({ authorized: true });
});
router.post('/', requestLimiter, async (req, res) => {
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