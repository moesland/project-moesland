const express = require('express');
const router = express.Router();
const NewsArticle = require('../../../models/newsArticle');
const Image = require('../../../models/image');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');

// set up rate limiter: maximum of five requests per minute
var RateLimit = require('express-rate-limit');
var limiter = RateLimit({
  windowMs: 1*60*1000, // 1 minute
  max: 5
});

router.use(express.json());
router.use(limiter);

router.get('/', async (req, res) => {
    res.send('Nieuwsartikel aanmaken');
});

router.post('/', authenticateToken, upload.single('bannerImage'), async (req, res) => {
    try {
        const filePath = path.join(__dirname, '../../..', req.file.path);
        const imageBuffer = fs.readFileSync(filePath);

        const existingImage = await Image.findOne({ 
            name: { $eq: req.file.originalname }, 
            data: { $eq: imageBuffer },
            contentType: { $eq: req.file.mimetype }
        });

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
                data: fs.readFileSync(filePath),
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