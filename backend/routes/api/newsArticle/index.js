const express = require('express');
const router = express.Router();

router.use(express.json());

router.get('/', async (req, res) => {
    try {
        res.status(200).json({hey: 'hoi'});
    } catch (err) {
        res.status(500).send("wrong")
    }
});

module.exports = router;