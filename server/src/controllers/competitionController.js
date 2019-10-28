import express from 'express';
import competitionService from '../businessLogic/competitionService.js';

const router = express.Router();

/**
 * @swagger
 *
 * /v1/competitions/:
 *   get:
 *     description: Get all competitions
 *     tags:
 *       - competitions
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
 *              id:
 *                  type: number
 *              name:
 *                  type: string
 *              description:
 *                  type: string
 *              deadline_date:
 *                  type: string
 *              experience:
 *                  type: number
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
    competitionService.getCompetitions(req.query)
    .then((result) => res.json(result))
    .catch((error) => next(error));
});

/**
 * @swagger
 *
 * /v1/competitions/active:
 *   get:
 *     description: Get active competitions
 *     tags:
 *       - competitions
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
 *              id:
 *                  type: number
 *              name:
 *                  type: string
 *              description:
 *                  type: string
 *              deadline_date:
 *                  type: string
 *              experience:
 *                  type: number
 *       401:
 *         description: Unauthorized access
 *         schema:
 *           $ref: '#/definitions/401'
 *       500:
 *         description: Server error
 *         schema:
 *           $ref: '#/definitions/500'
 */

router.get('/active', (req, res, next) => {
  competitionService.getActiveCompetitions(req.query)
  .then((result) => res.json(result))
  .catch((error) => next(error));
});


/**
 * @swagger
 *
 * /v1/competitions/past:
 *   get:
 *     description: Get past competitions
 *     tags:
 *       - competitions
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
 *              id:
 *                  type: number
 *              name:
 *                  type: string
 *              description:
 *                  type: string
 *              deadline_date:
 *                  type: string
 *              experience:
 *                  type: number
 *       401:
 *         description: Unauthorized access
 *         schema:
 *           $ref: '#/definitions/401'
 *       500:
 *         description: Server error
 *         schema:
 *           $ref: '#/definitions/500'
 */

router.get('/past', (req, res, next) => {
  competitionService.getPastCompetitions(req.query)
  .then((result) => res.json(result))
  .catch((error) => next(error));
});

/**
 * @swagger
 *
 * /v1/competitions/{id}:
 *   get:
 *     description: Get competition by id
 *     tags:
 *       - competitions
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: response
 *         schema:
 *           type: object
 *           properties:
 *              id:
 *                  type: number
 *              name:
 *                  type: string
 *              description:
 *                  type: string
 *              deadline_date:
 *                  type: string
 *              experience:
 *                  type: number        
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
  competitionService.getCompetitionById(req.params.id)
    .then((result) => res.json(result))
    .catch((error) => next(error));
});

/**
 * @swagger
 *
 * /v1/competitions:
 *   post:
 *     description: add competition
 *     tags:
 *       - competitions
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *              name:
 *                  type: string
 *              description:
 *                  type: string
 *              deadline_date:
 *                  type: string
 *              experience:
 *                  type: number
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
router.post('/', (req, res, next) => {
  competitionService.createCompetition(req.body)
    .then(() => res.status(201).end())
    .catch((error) => next(error));
});

/**
 * @swagger
 *
 * /v1/competitions/{id}:
 *   put:
 *     description: update competition
 *     tags:
 *       - competitions
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *              name:
 *                  type: string
 *              description:
 *                  type: string
 *              deadline_date:
 *                  type: string
 *              experience:
 *                  type: number
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
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
  competitionService.updateCompetition(req.params.id, req.body)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

/**
 * @swagger
 *
 * /v1/competitions/{id}/winner:
 *   put:
 *     description: set competition winner
 *     tags:
 *       - competitions
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *              winner_id:
 *                  type: number
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
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
router.put('/:id/winner', (req, res, next) => {
  competitionService.setCompetitionWinner(req.params.id, req.body)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});


/**
 * @swagger
 *
 * /v1/competitions/{id}:
 *   delete:
 *     description: delete competition
 *     tags:
 *       - competitions
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
  competitionService.deleteCompetition(req.params.id)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

/**
 * @swagger
 *
 * /v1/competitions/{id}/followers:
 *   get:
 *     description: Get competition followers
 *     tags:
 *       - competitions
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: response
 *         schema:
 *           type: object
 *           properties:
 *              id:
 *                  type: number
 *              user_id:
 *                  type: number
 *              competition_id:
 *                  type: number
 *       401:
 *         description: Unauthorized access
 *         schema:
 *           $ref: '#/definitions/401'
 *       500:
 *         description: Server error
 *         schema:
 *           $ref: '#/definitions/500'
 */
router.get('/:id/followers', (req, res, next) => {
  competitionService.getCompetitionFollowers(req.params.id)
    .then((result) => res.json(result))
    .catch((error) => next(error));
});

/**
 * @swagger
 *
 * /v1/competitions/{id}/followers:
 *   post:
 *     description: add competition followers
 *     tags:
 *       - competitions
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *              user_id:
 *                  type: number
 *              competition_id:
 *                  type: number
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
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

router.post('/:id/followers', (req, res, next) => {
  competitionService.createCompetitionFollower(req.params.id, req.body)
    .then(() => res.status(201).end())
    .catch((error) => next(error));
});

/**
* @swagger
*
* /v1/competitions/{id}/followers/{follower_id}:
*   delete:
*     description: delete competition follower
*     tags:
*       - competitions
*     produces:
*       - application/json
*     parameters:
*       - name: id
*         in: path
*         required: true
*         schema:
*           type: number
*       - name: follower_id
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
router.delete('/:id/followers/:follower_id', (req, res, next) => {
competitionService.deleteCompetitionFollower(req.params.id, req.params.follower_id)
  .then(() => res.status(204).end())
  .catch((error) => next(error));
});


export default router;
