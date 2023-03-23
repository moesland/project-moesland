const express = require('express');
const router = express.Router();
const NewsArticle = require('../../../models/newsArticle');

router.use(express.json());

router.get('/', async (req, res) => {
    res.send('hello');
});

router.post('/', async (req, res) => {
    try {
        const newArticle = new NewsArticle({ 
            title: req.body.title,
            content: req.body.content,
            bannerImage: req.body.bannerImage,
            date: Date.now(),
        });
        const savedArticle = await newArticle.save();
        res.status(201).json(savedArticle);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

module.exports = router;