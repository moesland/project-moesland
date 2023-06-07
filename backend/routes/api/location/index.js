const express = require('express');

const router = express.Router();

router.use(express.json());

/**
 * @swagger
 * /api/location:
 *   get:
 *     summary: Get all locations
 *     tags:
 *       - Location
 *     responses:
 *       200:
 *         description: List of locations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/models/location'
 */
router.get('/', async (req, res) => {
  try {
    Location.find({})
      .then(() => res.json());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
