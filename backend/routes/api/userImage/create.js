const express = require('express');
const router = express.Router();
const { createUserImage } = require('../../../repository/userImage');

router.use(express.json());

router.post('/', async (req, res) => {
    const { image } = req.body;

    try {
        await createUserImage(image);
        res.status(200).send(`User image created successfully!`);
    } catch (err) {
        res.status(500).send(`Could not create user image: ${err}`);
    }
});

module.exports = router;