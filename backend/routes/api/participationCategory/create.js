const express = require('express');

const router = express.Router();
const {
  body,
  validationResult,
} = require('express-validator');

const auth = require('../../../middlewares/auth');

const {
  getParticipationCategoryByName,
  createParticipationCategory,
} = require('../../../repository/participationCategory');

router.use(express.json());

/**
 * @swagger
 * /api/participation-category/create:
 *   post:
 *     summary: Create a new participation category
 *     tags:
 *       - Participation Category
 *     requestBody:
 *       description: Participation category object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               color:
 *                 type: string
 *           example:
 *             name: 'Kleine Loopgroep'
 *             description: 'Loopgroepen onder de 11 personen'
 *             color: '#FF0000'
 *     responses:
 *       201:
 *         description: Participation category created successfully.
 *       400:
 *         description: Bad request, check the request body.
 *       401:
 *         description: Unauthorized, invalid token.
 *       500:
 *         description: Could not create participation category.
 */
router.post(
  '/',
  [
    body('name').trim().isString().notEmpty(),
    body('description').trim().isString().notEmpty(),
    body('color').trim().isString().notEmpty(),
    body().custom((value, { req }) => {
      const { color } = req.body;
      // validate if correct hex color with regex, 6 characters
      if (!color.match(/^#[0-9A-F]{6}$/i)) {
        throw new Error('Color must be a valid hex color, a # followed by 6 characters');
      }
      return true;
    }),
  ],
  auth.authenticateToken,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const {
        name, description, color,
      } = req.body;

      const participationCategory = await getParticipationCategoryByName(name);

      if (!participationCategory) {
        await createParticipationCategory(name, description, color);
        return res.status(201).send('Participation category created successfully.');
      }
      return res.status(409).send('Participation category already exists with this name.');
    } catch (err) {
      return res.status(500).send(`Could not create category: ${err}`);
    }
  },
);

module.exports = router;
