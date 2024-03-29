const express = require('express');
const voteRepository = require('../../../repository/vote');

const router = express.Router();

router.use(express.json());

/**
 * @swagger
 * /api/vote/bulk:
 *   post:
 *     summary: Bulk operation on votes
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Vote
 *     requestBody:
 *       description: Vote object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - operation
 *              - votes
 *             properties:
 *               operation:
 *                 type: string
 *                 description: Bulk operation
 *               votes:
 *                 type: array
 *                 description: Votes
 */
router.post('/', async (req, res, next) => {
  try {
    const { operation, votes } = req.body;

    if (!['delete', 'add', 'update'].includes(operation)) {
      return res.status(400).json({ error: 'Invalid bulk operation' });
    }

    let result = false;
    switch (operation) {
      case 'delete':
        result = await voteRepository.bulkDelete(votes);
        break;
      case 'add':
        result = await voteRepository.bulkAdd(votes);
        break;
      default:
        return res.status(400).json({ error: 'Invalid bulk operation' });
    }

    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
