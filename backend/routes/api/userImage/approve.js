const express = require('express');

const router = express.Router();
const { getUserImageById, approveUserImage } = require('../../../repository/userImage');

router.use(express.json());

router.post('/', async (req, res) => {
  const { id } = req.body;

  try {
    const userImage = await getUserImageById(id);
    if (userImage) {
      await approveUserImage(userImage);
      res.status(200).send('User image approved successfully!');
    } else {
      res.status(500).send('Could not approve user image.');
    }
  } catch (err) {
    res.status(500).send(`Could not approve user image: ${err}`);
  }
});

module.exports = router;
