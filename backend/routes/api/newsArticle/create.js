const express = require('express');
const router = express.Router();
const Image = require('../../../models/image');
const sanitize = require('sanitize-filename');
const multer = require('multer');
const upload = multer({
    dest: 'uploads/',
    limits: { fieldSize: 50 * 1024 * 1024 }
});
const { createNewsArticle } = require('../../../repository/newsArticle');
const fs = require('fs');
const path = require('path');
const auth = require('../../../middlewares/auth');
const escape = require('escape-html');

router.use(express.json());

router.post('/', auth.authenticateToken, upload.single('bannerImage'), async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(500).send('Could not create news article.');
        }

        const filePath = path.join(__dirname, '../../..', 'uploads', sanitize(req.file.filename));
        if (!fs.existsSync(filePath)) {
            return res.status(500).send('Could not create news article: file does not exist, path:' + escape(filePath));
        }

        const imageBuffer = fs.readFileSync(filePath);
        bannerImage = new Image({
            name: req.file.originalname,
            data: imageBuffer,
            contentType: req.file.mimetype
        });

        await createNewsArticle(title, bannerImage, content);
        res.status(201).send('News article created successfully!');
    } catch (err) {
        res.status(500).send(`Could not create news article: ${err}`);
    }
});

module.exports = router;