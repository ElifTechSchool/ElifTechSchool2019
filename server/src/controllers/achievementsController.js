import express from 'express';
import achievementService from '../businessLogic/achievementsService.js';

const router = express.Router();

/**
 * @swagger
 *
 * /v1/achievements:
 *   get:
 *     description: Get achievements
 *     tags:
 *       - achievements
 *     parameters: []
 *     responses:
 *       200:
 *         description: response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: number
 *                    name:
 *                      type: string
 *                    description:
 *                      type: string
 *                    type:
 *                      type: string
 *                    experience:
 *                      type: number
 *                    photo_url:
 *                      type: string
 *       401:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/401'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/500'
 */
router.get('/', (req, res, next) => {
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
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 type:
 *                   type: string
 *                 experience:
 *                    type: number
 *                 photo_url:
 *                   type: string
 *       401:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/401'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/500'
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
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               type:
 *                 type: string
 *               experience:
 *                  type: number
 *               photo_url:
 *                 type: string
 *     responses:
 *       201:
 *         description: added success
 *       401:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/401'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/500'
 */
router.post('/', (req, res, next) => {
  achievementService.createAchievement(req.body)
    .then(() => res.status(201).end())
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/401'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/500'
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
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                  type: string
 *               type:
 *                  type: string
 *               experience:
 *                  type: number
 *               photo_url:
 *                  type: string
 *     responses:
 *       204:
 *         description: added success
 *       401:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/401'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/500'
 */
router.put('/:id', (req, res, next) => {
  achievementService.updateAchievement(req.params.id, req.body)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

export default router;
