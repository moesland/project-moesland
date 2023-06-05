const express = require('express');
const { getAllParadeParticipationCategories } = require('../../../repository/participationCategory');

const router = express.Router();

router.use(express.json());

/**
 * @swagger
 * /api/participation-category:
 *   get:
 *     summary: Get all parade participation categories
 *     tags:
 *       - Participation Category
 *     responses:
 *       200:
 *         description: Parade participation categories
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/models/participationCategory'
 *       500:
 *         description: Error fetching parade categories
 */
router.get('/', async (req, res) => {
  try {
    return res.status(200).json(await getAllParadeParticipationCategories());
  } catch (err) {
    return res.status(500).send('Error fetching parade categories');
  }
});

module.exports = router;
