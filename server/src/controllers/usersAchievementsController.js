import express from 'express';
import achievementsService from '../businessLogic/achievementsService.js';
import usersService from '../businessLogic/usersService.js';
import userAchievementsService from '../businessLogic/userAchievementsService.js';

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
 *             achievements:
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
 * /v1/users/{id}/achievements:
 *   post:
 *     description: add achievements to user
 *     tags:
 *       - usersAchievements
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: array
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             achievements:
 *               type: array
 *               items:
 *                 type: number
 *     responses:
 *       204:
 *         description: added success
 *       401:
 *         description: Unauthorized access
 *         schema:
 *           $ref: '#/definitions/401'
 *       500:
 *         description: Server error
 *         schema:
 *           $ref: '#/definitions/500'
 */

router.post('/:id/achievements', async (req, res, next) => {
  const userId = req.params.id;
  if (!userId || !Array.isArray(req.body.achievements)) {
    res.status(401).send({ error: 'incorest data' });
  }
  const userAchievements = await userAchievementsService.getAchievementsByUserId(userId);
  const achievementsToAdd = req.body.achievements.filter((a) => userAchievements.indexOf(a) === -1);
  if (!achievementsToAdd.length) {
    res.send({ message: 'achievements have already been add to this user' });
    return;
  }
  userAchievementsService.createUserAchievements(
    achievementsToAdd.map((achievement) => ({ user_id: userId, achievement_id: achievement })),
  )
    .then(() => res.status(201).end())
    .catch((error) => next(error));
});
/**
 * @swagger
 *
 * /v1/users/{id}/achievements/{achievementId}:
 *   post:
 *     description: validate if the user and achievement with such id exist
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
