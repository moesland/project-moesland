const express = require('express');
const fs = require('fs');
const path = require('path');
const escape = require('escape-html');

const router = express.Router();
const multer = require('multer');
const sanitize = require('sanitize-filename');
const Image = require('../../../models/image');

const upload = multer({ dest: 'uploads/', limits: { fieldSize: 50 * 1024 * 1024 } });
const { createNewsArticle } = require('../../../repository/newsArticle');
const auth = require('../../../middlewares/auth');

router.use(express.json());

/**
 * @swagger
 * /api/news-article/create:
 *   post:
 *     summary: Create a news article.
 *     tags: [NewsArticle]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               bannerImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: News article created successfully!
 *       500:
 *         description: Could not create news article.
 *       401:
 *         description: Unauthorized.
 */
router.post('/', auth.authenticateToken, upload.single('bannerImage'), async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(500).send('Could not create news article.');
    }

    const filePath = path.join(__dirname, '../../..', 'uploads', sanitize(req.file.filename));
    if (!fs.existsSync(filePath)) {
      return res.status(500).send(`Could not create news article: file does not exist, path:${escape(filePath)}`);
    }

    const imageBuffer = fs.readFileSync(filePath);

    const bannerImage = new Image({
      name: req.file.originalname,
      data: imageBuffer,
      contentType: req.file.mimetype,
    });

    await createNewsArticle(title, bannerImage, content);
    return res.status(201).send('News article created successfully!');
  } catch (err) {
    return res.status(500).send(`Could not create news article: ${escape(err)}`);
  }
});

module.exports = router;
