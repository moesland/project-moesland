const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const { updateNewsArticleById } = require('../../../repository/newsArticle');

router.use(express.json());

router.post('/', [
    body('title').trim().isString(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { id, title, content } = req.body;
    if (!id || !title || !content) {
        return res.status(500).send('Could not create news article.');
    }

    try {
        await updateNewsArticleById(id, title, content);
        res.status(200).json(`News article updated successfully!`);
    } catch (err) {
        console.error(err);
        res.status(500).json(`Could not update news article: ${err}`);
    }
});

module.exports = router;