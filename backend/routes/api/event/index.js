const express = require('express');
const { getAllEvents } = require('../../../repository/event');

const router = express.Router();

router.use(express.json());

router.get('/', async (req, res) => {
    try {
        res.status(200).json(await getAllEvents());
    } catch (err) {
        res.status(500).send("wrong")
    }
});

module.exports = router;
