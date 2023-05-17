const express = require('express');

const router = express.Router();
const {
  body,
  validationResult,
} = require('express-validator');

const auth = require('../../../middlewares/auth');

const {
  getParadeParticipationCategoryById,
  updateParadeParticipationCategoryById,
} = require('../../../repository/paradeParticipationCategory');

router.use(express.json());

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
        id, name, description, color,
      } = req.body;
      const paradeParticipationCategory = await getParadeParticipationCategoryById(id);

      if (paradeParticipationCategory) {
        await updateParadeParticipationCategoryById(
          id,
          name,
          description,
          color,
        );
        return res.status(200).json('Parade category updated successfully!');
      }
      return res.status(404).json('Parade category not found.');
    } catch (err) {
      return res.status(500).json(`Could not update parade category: ${err}`);
    }
  },
);

module.exports = router;
