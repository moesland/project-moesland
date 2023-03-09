const express = require('express');
const router = express.Router();

router.use(express.json());

router.get('/', async (req, res) => {
    res.send("hello");
});

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    console.log(req.body);

    if (email && password && email === 'admin@moesland.com' && password === 'root') {
        const authToken = 'dummy-auth-token';
        res.json({ authToken });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
});


module.exports = router;