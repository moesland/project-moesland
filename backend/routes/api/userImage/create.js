const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { createUserImage } = require('../../../repository/userImage');
const Image = mongoose.model('Image');

router.use(express.json());

router.post('/', async (req, res) => {
    const { image } = req.body;
    const { name, data, contentType } = image;

    const newImage = new Image({
        name, data, contentType
    });

    try {
        await createUserImage(newImage);
        res.status(200).send(`User image created successfully!`);
    } catch (err) {
        res.status(500).send(`Could not create user image: ${err}`);
    }
});

module.exports = router;