const express = require('express');
const router = express.Router();
const Image = require('../../../models/image');
const upload = require('multer')({ dest: 'uploads/', limits: { fieldSize: 50 * 1024 * 1024 } });
const { createNewsArticle } = require('../../../repository/newsArticle');
const fs = require('fs');
const path = require('path');
const { authenticateToken } = require('../../../middlewares/auth');

router.use(express.json());

router.post('/', authenticateToken, upload.single('bannerImage'), async (req, res) => {
    try {
        const { title, content } = req.body;
        let bannerImage;

        if (req.file && req.file.path) {
            const filePath = path.join(__dirname, '../../..', req.file.path);
            const imageBuffer = fs.readFileSync(filePath);

            bannerImage = new Image({
                name: req.file.originalname,
                data: imageBuffer,
                contentType: req.file.mimetype
            });
        }

        await createNewsArticle(title, bannerImage, content);
        res.status(201).send('News article created successfully!');
    } catch (err) {
        res.status(500).send(`Could not create news article: ${err}`);
    }
});

module.exports = router;