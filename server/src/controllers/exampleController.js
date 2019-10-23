import express from 'express';
import exampleService from '../businessLogic/exampleService.js';

const router = express.Router();

/**
 * @swagger
 *
 * /v1/examples:
 *   get:
 *     description: Get examples
 *     tags:
 *       - examples
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
 *                    message:
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
  exampleService.getExamples()
    .then((result) => res.json(result))
    .catch((error) => next(error));
});

/**
 * @swagger
 *
 * /v1/examples/{id}:
 *   get:
 *     description: Get example by id
 *     tags:
 *       - examples
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
 *                 id:
 *                   type: number
 *                 message:
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
  exampleService.getExampleById(req.params.id)
    .then((result) => res.json(result))
    .catch((error) => next(error));
});

/**
 * @swagger
 *
 * /v1/examples:
 *   post:
 *     description: add example
 *     tags:
 *       - examples
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
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
  exampleService.createExample(req.body)
    .then(() => res.status(201).end())
    .catch((error) => next(error));
});

/**
 * @swagger
 *
 * /v1/examples/{id}:
 *   put:
 *     description: update example
 *     tags:
 *       - examples
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *     parameters:
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
  exampleService.updateExample(req.params.id, req.body)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

/**
 * @swagger
 *
 * /v1/examples/{id}:
 *   delete:
 *     description: update example
 *     tags:
 *       - examples
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
  exampleService.deleteExample(req.params.id)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});


export default router;
