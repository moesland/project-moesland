const express = require('express');

const router = express.Router();
const { getUserImageById, restoreUserImage } = require('../../../repository/userImage');

router.use(express.json());

router.post('/', async (req, res) => {
  const { id } = req.body;

  try {
    const userImage = await getUserImageById(id);
    if (userImage) {
      await restoreUserImage(userImage);
      res.status(200).send('User image restored successfully!');
    } else {
      res.status(500).send('Could not restore user image.');
    }
  } catch (err) {
    res.status(500).send(`Could not restore user image: ${err}`);
  }
});

module.exports = router;
