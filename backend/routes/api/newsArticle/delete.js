const express = require('express');
const { getNewsArticleById, deleteNewsArticle } = require('../../../repository/newsArticle');
const router = express.Router();

router.use(express.json());

router.post('/', async (req, res) => {
    try {
        const { _id } = req.body;

        const newsArticle = await getNewsArticleById(_id);
        if (newsArticle) {
            await deleteNewsArticle(newsArticle);
            res.status(200).json('News article deleted successfully!');
        } else {
            res.status(500).json('Could not delete news article.');
        }
    } catch (err) {
        res.status(500).json(`Could not delete news article: ${err}`);
    }
});

module.exports = router;