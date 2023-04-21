const express = require('express');

const router = express.Router();
const multer = require('multer');
const NewsArticle = require('../../../models/newsArticle');
const Image = require('../../../models/image');

const upload = multer({ dest: 'uploads/', limits: { fieldSize: 50 * 1024 * 1024 } });
const { createNewsArticle } = require('../../../repository/newsArticle');
const fs = require('fs');
const path = require('path');
const auth = require('../../../middlewares/auth');

router.use(express.json());

router.get('/', async (req, res) => {
  res.send('Nieuwsartikel aanmaken');
});

router.post('/', auth.authenticateToken, upload.single('bannerImage'), async (req, res) => {
  try {
    const { title, date, content } = req.body;
    const filePath = path.join(__dirname, '../../..', req.file.path);
    const imageBuffer = fs.readFileSync(filePath);

    const bannerImage = new Image({
      name: req.file.originalname,
      data: imageBuffer,
      contentType: req.file.mimetype,
    });

    const newArticle = await createNewsArticle(title, date, bannerImage, content);
    res.status(201).send('News article created successfully!');
  } catch (err) {
    res.status(500).send(`Could not create news article: ${err}`);
  }
});

module.exports = router;
