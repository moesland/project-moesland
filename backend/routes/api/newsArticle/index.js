const express = require('express');
const { getAllNewsArticle } = require('../../../repository/newsArticle');

const router = express.Router();

router.use(express.json());

router.get('/', async (req, res) => {
    try {
        res.status(200).json(await getAllNewsArticle());
    } catch (err) {
        res.status(500).send("wrong")
    }
});

router.use('/create', require('./create'));
router.use('/update', require('./update'));
router.use('/delete', require('./delete'));

module.exports = router;
