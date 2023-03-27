const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const { updateNewsArticleById } = require('../../../repository/newsArticle');
const { updateImageById } = require('../../../repository/image');

router.use(express.json());

router.post('/', [
    body('title').trim().isString(),
    body('bannerImage.name').isString(),
    body('bannerImage.data').isBase64(),
    body('bannerImage.contentType').isMimeType(),
    body('content').isString()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id, date, title, bannerImage, content } = req.body;
    const { bannerImageId } = req.body.bannerImage;
    const { name, data, contentType } = req.body.bannerImage;

    try {
        const updatedArticle = await updateNewsArticleById(id, date, title, bannerImage, content);
        const updatedImage = await updateImageById(bannerImageId, name, data, contentType);

        res.status(200).send(`News article ${updatedArticle.title} and image ${updatedImage.name} updated successfully!`);
    } catch (err) {
        res.status(500).send(`Could not update news article or image: ${err}`);
    }
});

module.exports = router;