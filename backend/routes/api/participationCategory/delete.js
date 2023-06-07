const express = require('express');
const escapeHtml = require('escape-html');
const {
  deleteParticipationCategory,
  getParticipationCategoryById,
} = require('../../../repository/participationCategory');

const router = express.Router();

router.use(express.json());

/**
 * @swagger
 * /api/participation-category/delete:
 *   post:
 *     summary: Delete a participation category
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Participation Category
 *     requestBody:
 *       description: Participation category object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - _id
 *             properties:
 *               _id:
 *                 type: string
 *                 description: Participation category _id
 *     responses:
 *       200:
 *         description: Participation category deleted successfully!
 *       500:
 *         description: Could not delete participation category.
 *       404:
 *         description: Participation category doesn't exist.
 *       401:
 *         description: Unauthorized.
 */
router.post('/', async (req, res) => {
  const { _id } = req.body;
  try {
    const participationCategory = await getParticipationCategoryById(_id);
    if (participationCategory) {
      await deleteParticipationCategory(participationCategory);
      return res.status(200).send('Participation category deleted successfully.');
    }
    return res.status(404).send('Participation category doesn\'t exist.');
  } catch (err) {
    return res.status(500).send(`Could not delete participation category: ${escapeHtml(err)}.`);
  }
});

module.exports = router;
