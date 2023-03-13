const express = require('express');
const { generateAuthToken } = require('../../services/auth.service');
const { getPreciseUser } = require('../../repository/user');
const router = express.Router();

router.use(express.json());

router.get('/', async (req, res) => {
    res.send("hello");
});

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    const user = getPreciseUser(email, password);

    if (true) {
        const authToken = generateAuthToken();
        return res.json({ username, authToken });
    } 
         
    res.status(401).json({ message: 'Invalid email or password' });
});


module.exports = router;