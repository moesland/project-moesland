const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const { updateEventById, getEventById } = require('../../../repository/event');

router.use(express.json());

router.post('/', [
    body('title').trim().isString().notEmpty(),
    body('description').trim().isString().notEmpty(),
    body('startdate').trim().isISO8601().notEmpty(),
    body('enddate').trim().isISO8601().notEmpty(),
    body('location').trim().notEmpty(),
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id, title, description, startdate, enddate, location } = req.body;
        const event = await getEventById(id);
        //console.log(event);
        if (event) {
            await updateEventById(event._id, title, description, startdate, enddate, location);
            res.status(200).json(`Event updated successfully!`);
        }
        else{
            res.status(404).json(`Event not found.`);
        }
    } catch (err) {
        res.status(500).json(`Could not update event: ${err}`);
    }
});

module.exports = router;