const express = require('express');
const router = express.Router();
const { getUserImageById, declineUserImage } = require('../../../repository/userImage');

router.use(express.json());

router.post('/', async (req, res) => {
    const { id } = req.body;

    try {
        const userImage = await getUserImageById(id);
        if (userImage) {
            await declineUserImage(userImage);
            res.status(200).send(`User image declined successfully!`);
        } else {
            res.status(500).send(`Could not decline user image.`);
        }
    } catch (err) {
        res.status(500).send(`Could not decline user image: ` + err);
    }
});

module.exports = router;