import express from 'express';
import achievementService from '../businessLogic/achievementsService.js';
import userAchievementsService from '../businessLogic/userAchievementsService.js';
import upload from '../businessLogic/cloudinaryService.js';

const router = express.Router();

/**
 * @swagger
 *
 * /v1/achievements/types:
 *   get:
 *     description: Get achievements types
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
 *                types:
 *                  type: array
 *       401:
 *         description: Unauthorized access
 *         schema:
 *           $ref: '#/definitions/401'
 *       500:
 *         description: Server error
 *         schema:
 *           $ref: '#/definitions/500'
 */

router.get('/types', (req, res, next) => {
  achievementService.getTypes()
    .then((data) => res.json({ data }))
    .catch((error) => next(error));
});
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

router.get('/', (req, res, next) => {
  achievementService.getAchievements(req.query, req.headers.authorization)
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
router.post('/', upload.single('photo_url'), (req, res, next) => {
  achievementService.createAchievement(req)
    .then(() => res.status(201).send())
    .catch((error) => next(error));
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
router.put('/:id', upload.single('photo_url'), (req, res, next) => {
  const {
    name,
    description,
    type,
    experience,
    createdAt,
  } = req.body;
  const updates = {
    name,
    description,
    type,
    experience,
    createdAt: new Date(createdAt),
  };
  if (req.file) {
    const photo_url = req.file.secure_url;
    updates.photo_url = photo_url;
  }
  achievementService.updateAchievement(req.params.id, updates)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

/**
 * @swagger
 *
 * /v1/achievements/{id}/users:
 *   get:
 *     description: Get users by id achievement
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
 *             users:
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

router.post('/:id/users', async (req, res, next) => {
  const achievementId = req.params.id;
  if (!achievementId || !Array.isArray(req.body.users)) {
    res.status(401).send({ error: 'incorest data' });
  }
  const achievementUsers = await userAchievementsService.getUsersOfSpecificAchievement(achievementId);
  const usersToAdd = req.body.users.filter((u) => achievementUsers.indexOf(u) === -1);
  if (!usersToAdd.length) {
    res.send({ message: 'users have already been add to this achievement' });
    return;
  }
  userAchievementsService.createUserAchievements(
    usersToAdd.map((user) => ({ user_id: user, achievement_id: achievementId })),
  )
    .then(() => res.status(201).end())
    .catch((error) => next(error));
});

/**
 * @swagger
 *
 * /v1/achievements/{id}/users:
 *   get:
 *     description: Get users by id achievement
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
 *             users:
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
router.get('/:id/users', (req, res, next) => {
  userAchievementsService.getUsersOfSpecificAchievement(req.params.id)
    .then((result) => res.json(result))
    .catch((error) => next(error));
});


export default router;
