import express from 'express';
import eventsService from '../businessLogic/eventsService.js';
import upload from '../businessLogic/cloudinaryService.js';

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
 *     parameters: 
 *       - name: page
 *         in: query
 *         required: true
 *         type: number
 *       - name: pageSize
 *         in: query
 *         required: true
 *         type: number
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
 *                image_url:
 *                  type: string
 *                date:
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
  eventsService.getEvents(req.query)
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
 *             image_url:
 *               type: string
 *             date:
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
    .then((result) => res.json(result))
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
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: title
 *         in: formData
 *         required: true
 *         type: string
 *       - name: description
 *         in: formData
 *         required: true
 *         type: string
 *       - name: location
 *         in: formData
 *         type: string
 *       - name: max_people
 *         in: formData
 *         type: number
 *       - name: image_url
 *         in: formData
 *         type: file
 *       - name: date
 *         in: formData
 *         type: string
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
router.post('/', upload.single('image_url'), (req, res, next) => {
  req.body.image_url = req.file.secure_url;
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
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: number
 *       - name: title
 *         in: formData
 *         type: string
 *       - name: description
 *         in: formData
 *         type: string
 *       - name: location
 *         in: formData
 *         type: string
 *       - name: max_people
 *         in: formData
 *         type: number
 *       - name: image_url
 *         in: formData
 *         type: file
 *       - name: date
 *         in: formData
 *         type: string
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
router.put('/:id', upload.single('image_url'), (req, res, next) => {
  if (req.file) {
    req.body.image_url = req.file.secure_url;
  }
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
