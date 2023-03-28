const express = require('express');
const router = express.Router();
const { updateNewsArticleById } = require('../../../repository/newsArticle');

router.use(express.json());

router.post('/', async (req, res) => {
    const { id, title, content } = req.body;

    try {
        const updatedArticle = await updateNewsArticleById(id, title, content);
        res.status(200).send(`News article ${updatedArticle.title} updated successfully!`);
    } catch (err) {
        res.status(500).send(`Could not update news article: ${err}`);
    }
});

module.exports = router;