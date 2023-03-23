const express = require('express');
const router = express.Router();
const NewsArticle = require('../../../models/newsArticle');

router.use(express.json());

router.get('/', async (req, res) => {
    res.send('hello');
});

router.post('/', async (req, res) => {
    try {
      const newData = new NewsArticle(req.body);
      newData.date = Date.now();
      await newData.save();
      res.status(201).json(newData);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

module.exports = router;