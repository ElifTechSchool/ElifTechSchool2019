import express from 'express';
import userAchievementsService from '../businessLogic/userAchievementsService.js';
import achievementsService from '../businessLogic/achievementsService.js';

const router = express.Router();

/**
 * @swagger
 *
 * /v1/users/{id}/achievements:
 *   get:
 *     description: Get achievements by id user
 *     tags:
 *       - usersAchievements
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: response
 *         schema:
 *           type: object
 *           properties:
 *             roles:
 *               type: array
 *               items:
 *                 type: string
 *       401:
 *         description: Unauthorized access
 *         schema:
 *           $ref: '#/definitions/401'
 *       500:
 *         description: Server error
 *         schema:
 *           $ref: '#/definitions/500'
 */
router.get('/:id/achievements', (req, res, next) => {
    userAchievementsService.getAchievementsByUserId(req.params.id)
        .then((result) => res.json(result))
        .catch((error) => next(error));
});

/**
 * @swagger
 *
 * /v1/users/{id}/achievements/{achievementId}:
 *   post:
 *     description: Add achievement to users
 *     tags:
 *       - usersAchievements
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: response
 *         schema:
 *           type: object
 *           properties:
 *             roles:
 *               type: array
 *               items:
 *                 type: string
 *       401:
 *         description: Unauthorized access
 *         schema:
 *           $ref: '#/definitions/401'
 *       500:
 *         description: Server error
 *         schema:
 *           $ref: '#/definitions/500'
 */
router.post('/:userId/achievements/:achievementId', async (req, res) => {
    try {
        const { userId, achievementId } = req.params;
        if (!userId || !achievementId) {
            res.send({ message: 'incorrect input: missing userId or achievementId' });
        }
        const user = await usersService.getUserById(userId);
        const achievement = await achievementsService.getAchievementById(achievementId);
        res.send({
            user: !!user,
            achievement: !!achievement.length,
        });

    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

export default router;
