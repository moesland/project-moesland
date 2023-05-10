const express = require('express');
const router = express.Router();
const Image = require('../../../models/image');
const { body, validationResult } = require('express-validator');
const sanitize = require('sanitize-filename');
const upload = require('multer')({ dest: 'uploads/', limits: { fieldSize: 50 * 1024 * 1024 } });
const { updateNewsArticleById } = require('../../../repository/newsArticle');
const { updateImageById } = require('../../../repository/image');
const fs = require('fs');
const path = require('path');
const { authenticateToken } = require('../../../middlewares/auth');
const escape = require('escape-html');

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
    return res.status(200).json('News article updated successfully!');
  } catch (err) {
    console.error(err);
    return res.status(500).json(`Could not update news article: ${err}`);
  }
});

module.exports = router;
