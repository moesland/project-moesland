const express = require('express');

const router = express.Router();
const { body, validationResult } = require('express-validator');
const { authenticateToken } = require('../../../middlewares/auth');
const sanitize = require('sanitize-filename')
const upload = require('multer')({ dest: 'uploads/', limits: { fieldSize: 50 * 1024 * 1024 } });
const { updateNewsArticleById } = require('../../../repository/newsArticle');
const mongoose = require('mongoose');
const Image = mongoose.model('Image');
const { updateImageById } = require('../../../repository/image');
const fs = require('fs');
const path = require('path');
const escape = require('escape-html');

router.use(express.json());

router.post('/', [
  body('title').trim().isString(),
], authenticateToken, upload.single('bannerImage'), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { _id: id, title, originalImageId, content } = req.body;
    if (!id || !title || !content) {
      return res.status(500).send('Could not create news article.');
    }

    let bannerImage;

    if (req.file && req.file.path) {
      const filePath = path.join(__dirname, '../../..', 'uploads', sanitize(req.file.filename));
      if (!fs.existsSync(filePath)) {
        return res.status(500).send(`Could not create news article: file does not exist, path: ${escape(filePath)}`);
      }

      const imageBuffer = fs.readFileSync(filePath);

      bannerImage = new Image({
        name: req.file.originalname,
        data: imageBuffer,
        contentType: req.file.mimetype,
      });
    }

    if (bannerImage) {
      await updateImageById(originalImageId, bannerImage.name, bannerImage.data, bannerImage.contentType);
    }
    await updateNewsArticleById(id, title, content);
    return res.status(200).json('News article updated successfully!');
  } catch (err) {
    console.error(err);
    return res.status(500).json(`Could not update news article: ${err}`);
  }
});

module.exports = router;
