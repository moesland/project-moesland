const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const { updateNewsArticleByID } = require('../../../repository/newsArticle');

router.use(express.json());

router.post('/', [
    body('date').isDate(),
    body('title').trim().isString(),
    body('bannerImage').isURL(),
    body('content').isArray(),
    body('content.*.text').trim().optional().isString(),
    body('content.*.image.*.name').isString(),
    body('content.*.image.*.data').isBase64(),
    body('content.*.image.*.contentType').isMimeType()
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