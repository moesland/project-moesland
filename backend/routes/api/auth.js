const express = require('express');
const { validateAuthToken, validateAuthTokenRole } = require('../../middleware/auth');
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


module.exports = router;