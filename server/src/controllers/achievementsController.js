import express from 'express';
import achievementService from '../businessLogic/achievementsService.js';
import authMiddleware from '../middleware/auth.js';
import userAchievementsService from '../businessLogic/userAchievementsService.js'
import upload from '../businessLogic/cloudinaryService.js';

const router = express.Router();

/**
 * @swagger
 *
 * /v1/achievements:
 *   get:
 *     description: Get achievements
 *     tags:
 *       - achievements
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: response
 *         schema:
 *           type: array
 *           items:
 *              type: object
 *              properties:
 *                id:
 *                  type: number
 *                name:
 *                  type: string
 *                description:
 *                  type: string
 *                type:
 *                  type: string
 *                experience:
 *                  type: number
 *                photo_url:
 *                  type: string
 *       401:
 *         description: Unauthorized access
 *         schema:
 *           $ref: '#/definitions/401'
 *       500:
 *         description: Server error
 *         schema:
 *           $ref: '#/definitions/500'
 */
router.get('/', /*authMiddleware, */ (req, res, next) => {
  achievementService.getAchievements(req.query)
    .then((data) => res.json({ data }))
    .catch((error) => next(error));
});

/**
 * @swagger
 *
 * /v1/achievements/{id}:
 *   get:
 *     description: Get achievements by id
 *     tags:
 *       - achievements
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
 *             name:
 *               type: string
 *             description:
 *               type: string
 *             type:
 *               type: string
 *             experience:
 *                type: number
 *             photo_url:
 *               type: string
 *       401:
 *         description: Unauthorized access
 *         schema:
 *           $ref: '#/definitions/401'
 *       500:
 *         description: Server error
 *         schema:
 *           $ref: '#/definitions/500'
 */
router.get('/:id', (req, res, next) => {
  achievementService.getAchievementById(req.params.id)
    .then((data) => res.json({ data }))
    .catch((error) => next(error));
});

/**
 * @swagger
 *
 * /v1/achievements:
 *   post:
 *     description: add achievement
 *     tags:
 *       - achievements
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             description:
 *               type: string
 *             type:
 *               type: string
 *             experience:
 *                type: number
 *             photo_url:
 *               type: string
 *     responses:
 *       201:
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
//router.post('/', /*authMiddleware,*/ async (req, res, next) => {
router.post('/', upload.single('photo_url'), /*authMiddleware,*/ async (req, res, next) => {
  try {
    const achievement = await achievementService.createAchievement({
      ...req.body,
      photo_url: req.file.secure_url,
    });
    
// TODO: save user_achievement when pass access token
    if(res.locals.userId) {
      await userAchievementsService.createUserAchievements({
        userId: res.locals,
        achievementId: achievement.id,
      });
      const getUserAchievements = await userAchievementsService.getUserAchievements();
      console.log("getUserAchievements", getUserAchievements)    
    }

    res.status(201).send(achievement);
  } catch (error) {
      next(error);
  }
});

/**
 * @swagger
 *
 * /v1/achievements/{id}:
 *   delete:
 *     description: delete achievement
 *     tags:
 *       - achievements
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       204:
 *         description: delete success
 *       401:
 *         description: Unauthorized access
 *         schema:
 *           $ref: '#/definitions/401'
 *       500:
 *         description: Server error
 *         schema:
 *           $ref: '#/definitions/500'
 */
router.delete('/:id', (req, res, next) => {
  achievementService.deleteAchievement(req.params.id)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

/**
 * @swagger
 *
 * /v1/achievements/{id}:
 *   put:
 *     description: update achievement
 *     tags:
 *       - achievements
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             description:
 *                type: string
 *             type:
 *                type: string
 *             experience:
 *                type: number
 *             photo_url:
 *                type: string
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
router.put('/:id', (req, res, next) => {
  achievementService.updateAchievement(req.params.id, req.body)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

export default router;
