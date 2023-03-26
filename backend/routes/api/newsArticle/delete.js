const express = require('express');
const { getNewsArticleById, deleteNewsArticle } = require('../../../repository/newsArticle');
const router = express.Router();

router.use(express.json());

router.post('/', async (req, res) => {
    const { id } = req.body;

    try {
        const newsArticle = await getNewsArticleById(id);
        if (newsArticle) {
            await deleteNewsArticle(newsArticle);
            res.status(200).send(`News article deleted successfully!`);
        } else {
            res.status(500).send(`Could not delete news article.`);
        }
    } catch (err) {
        res.status(500).send(`Could not delete user: ${err}`);
    }
});

module.exports = router;