const express = require('express');
const router = express.Router();
const { getUserImageById, deleteUserImage } = require('../../../repository/userImage');

router.use(express.json());

router.post('/', async (req, res) => {
    const { id } = req.body;

    try {
        const userImage = await getUserImageById(id);
        if (userImage) {
            if (userImage.approvalStatus === 'declined') {
                await deleteUserImage(userImage);
                res.status(200).send(`User image deleted successfully!`);
            } else {
                res.status(500).send(`Could not delete user image: is not declined`);
            }
        } else {
            res.status(500).send(`Could not delete user image.`);
        }
    } catch (err) {
        res.status(500).send(`Could not delete user image: ` + err);
    }
});

module.exports = router;