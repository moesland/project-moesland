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

  try {
    const updatedArticle = await updateNewsArticleById(id, title, content);
    return res.status(200).json({ message: 'News article updated successfully!', updatedArticle });
  } catch (err) {
    console.error(err);
    return res.status(500).json(`Could not update news article: ${err}`);
  }
});

module.exports = router;
