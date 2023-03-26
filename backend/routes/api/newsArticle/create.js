const express = require('express');
const router = express.Router();
const NewsArticle = require('../../../models/newsArticle');
const Image = require('../../../models/image');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');

router.use(express.json());

router.get('/', async (req, res) => {
    res.send('hello');
});

router.post('/', upload.single('bannerImage'), async (req, res) => {
    try {
        const newImage = new Image({
            name: req.file.originalname,
            data: fs.readFileSync(req.file.path),
            contentType: req.file.mimetype
        });
        const savedImage = await newImage.save();

        const newArticle = new NewsArticle({
            title: req.body.title,
            content: req.body.content,
            date: Date.now(),
            bannerImage: savedImage._id
        });
        const savedArticle = await newArticle.save();
    } catch (err) {
        res.status(500).send(`Could not create news article: ${err}`);
    }
});

module.exports = router;