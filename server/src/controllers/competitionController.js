import express from 'express';
import competitionService from '../businessLogic/competitionService.js';

const router = express.Router();

/**
 * @swagger
 *
 * /v1/competitions:
 *   get:
 *     description: Get competitions
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
 *                type: number
 *              name: 
 *                type: string
 *              description:
 *                type: string
 *              deadline_date:
 *                type: string
 *              experiance:
 *                type: number      
 *       401:
 *         description: Unauthorized access
 *         schema:
 *           $ref: '#/definitions/401'
 *       500:
 *         description: Server error
 *         schema:
 *           $ref: '#/definitions/500'
 */

router.get('/v1/competitions', (req, res, next) => {
  competitionService.getCompetitions()
    .then((result) => res.json(result[0]))
    .catch((error) => next(error));
});

/**
 * @swagger
 *
 * /v1/competition/:id:
 *   get:
 *     description: Get competition by id
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
 *                type: number
 *              name: 
 *                type: string
 *              description:
 *                type: string
 *              deadline_date:
 *                type: string
 *              experiance:
 *                type: number
 *       401:
 *         description: Unauthorized access
 *         schema:
 *           $ref: '#/definitions/401'
 *       500:
 *         description: Server error
 *         schema:
 *           $ref: '#/definitions/500'
 */
router.get('v1/competitons/:id', (req, res, next) => {
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
 *                type: string
 *              description:
 *                type: string
 *              deadline_date:
 *                type: string
 *              experiance:
 *                type: number
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
router.post('/v1/competitions', (req, res, next) => {
  competitionService.createCompetition(req.body)
    .then(() => res.status(201).end())
    .catch((error) => next(error));
});

/**
 * @swagger
 *
 * /v1/competitions/:id:
 *   put:
 *     description: update competition
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
 *                type: string
 *              description:
 *                type: string
 *              deadline_date:
 *                type: string
 *              experiance:
 *                type: number
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
router.put('/v1/competitions/:id', (req, res, next) => {
  competitionService.updateCompetition(req.params.id, req.body)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

/**
 * @swagger
 *
 * /v1/competition/:id:
 *   delete:
 *     description: update competition
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
router.delete('/v1/competitions/:id', (req, res, next) => {
  competitionService.deleteCompetition(req.params.id)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});


export default router;
