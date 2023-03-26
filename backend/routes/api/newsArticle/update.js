const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const { updateNewsArticleByID } = require('../../../repository/newsArticle');

router.use(express.json());

router.post('/', [
    body('date').isDate(),
    body('title').trim().isString(),
    body('bannerImage').isMongoId(),
    body('bannerImage.*.name').isString(),
    body('bannerImage.*.data').isBase64(),
    body('bannerImage.*.contentType').isMimeType(),
    body('content').isString()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id, date, title, bannerImage, content } = req.body;

    try {
        const updatedArticle = await updateNewsArticleByID(id, date, title, bannerImage, content);
        res.status(200).send(`News article ${updatedArticle.title} updated successfully!`);
    } catch (err) {
        res.status(500).send(`Could not update news article: ${err}`);
    }
});

module.exports = router;