import express from 'express';
import eventsService from '../businessLogic/eventsService.js';

const router = express.Router();

/**
 * @swagger
 *
 * /v1/events:
 *   get:
 *     description: Get events
 *     tags:
 *       - events
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
 *                title:
 *                  type: string
 *                description:
 *                  type: string
 *                location:
 *                  type: string
 *                max_people:
 *                  type: number
 *                image:
 *                  type: string
 *                date:
 *                  type: string
 *                time:
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
  eventsService.getEvents()
    .then((result) => res.json(result))
    .catch((error) => next(error));
});

/**
 * @swagger
 *
 * /v1/events/{id}:
 *   get:
 *     description: Get event by id
 *     tags:
 *       - events
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
 *             id:
 *               type: number
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             location:
 *               type: string
 *             max_people:
 *               type: number
 *             image:
 *               type: string
 *             date:
 *               type: string
 *             time:
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
  eventsService.getEventById(req.params.id)
    .then((result) => res.json(result[0]))
    .catch((error) => next(error));
});

/**
 * @swagger
 *
 * /v1/events:
 *   post:
 *     description: add event
 *     tags:
 *       - events
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: number
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             location:
 *               type: string
 *             max_people:
 *               type: number
 *             image:
 *               type: string
 *             date:
 *               type: string
 *             time:
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
router.post('/', (req, res, next) => {
  eventsService.createEvent(req.body)
    .then(() => res.status(201).end())
    .catch((error) => next(error));
});

/**
 * @swagger
 *
 * /v1/events/{id}:
 *   put:
 *     description: update event
 *     tags:
 *       - events
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
 *             id:
 *               type: number
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             location:
 *               type: string
 *             max_people:
 *               type: number
 *             image:
 *               type: string
 *             date:
 *               type: string
 *             time:
 *               type: string
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
  eventsService.updateEvent(req.params.id, req.body)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

/**
 * @swagger
 *
 * /v1/events/{id}:
 *   delete:
 *     description: delete event
 *     tags:
 *       - events
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
  eventsService.deleteEvent(req.params.id)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});


export default router;
