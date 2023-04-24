const express = require('express');
const { getEventById, deleteEvent } = require('../../../repository/event');
const router = express.Router();

router.use(express.json());

router.post('/', async (req, res) => {
    const { _id } = req.body;
    try {     
        const event = await getEventById(_id);
        if (event) {
            await deleteEvent(event);
            res.status(200).send(`Event deleted successfully!`);
        } else {
            res.status(404).send(`Event doesn't exist.`);
        }
    } catch (err) {
        res.status(500).send(`Could not delete event:` + err);
    }
});

module.exports = router;