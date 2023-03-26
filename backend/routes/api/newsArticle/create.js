const express = require('express');
const router = express.Router();
const NewsArticle = require('../../../models/newsArticle');
const Image = require('../../../models/image');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');

router.use(express.json());

router.get('/', async (req, res) => {
    res.send('Nieuwsartikel aanmaken');
});

router.post('/', upload.single('bannerImage'), async (req, res) => {
    try {
        const existingImage = await Image.findOne({ 
            name: req.file.originalname, 
            data: fs.readFileSync(req.file.path),
            contentType: req.file.mimetype });

        if(existingImage){
            const newArticle = new NewsArticle({
                title: req.body.title,
                content: req.body.content,
                date: Date.now(),
                bannerImage: existingImage._id
            });
            await newArticle.save();
        }
        else{
            const newImage = new Image({
                name: req.file.originalname,
                data: fs.readFileSync(req.file.path),
                contentType: req.file.mimetype
            });
            const savedImage = await newImage.save();

            const newArticle = new NewsArticle({
                title: req.body.title,
                content: req.body.content,
                date: Date.now(),
                bannerImage: savedImage._id
            });
            await newArticle.save();
        }          
        res.status(201).send(`Newsarticle created`);
    } catch (err) {
        res.status(500).send(`Could not create news article: ${err}`);
    }
});

module.exports = router;