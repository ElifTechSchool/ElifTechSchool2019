import express from 'express';
import rankService from '../businessLogic/rankService.js';

const router = express.Router();

/**
 * @swagger
 *
 * /v1/ranks:
 *   get:
 *     description: Get ranks
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
 *                experience:
 *                  type: number
 *                number:
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
    rankService.getRanks()
      .then((result) => res.json(result))
      .catch((error) => next(error));
  });

  /**
 * @swagger
 *
 * /v1/ranks/{id}:
 *   get:
 *     description: Get rank by id
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
 *             name:
 *               type: string
 *             experience:
 *               type: number
 *             number:
 *               type: number
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
  rankService.getRankById(req.params.id)
    .then((result) => res.json(result))
    .catch((error) => next(error));
});

  /**
 * @swagger
 *
 * /v1/ranks:
 *   post:
 *     description: add rank
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
 *             experience:
 *               type: number
 *             number:
 *               type: number
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
router.post('/', (req, res, next) => {
    rankService.createRank(req.body)
      .then(() => res.status(201).end())
      .catch((error) => next(error));
  });

  /**
 * @swagger
 *
 * /v1/ranks/{id}:
 *   put:
 *     description: update rank
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
 *             experience:
 *               type: number
 *             number:
 *               type: number
 *             photo_url:
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
    rankService.updateRank(req.params.id, req.body)
      .then(() => res.status(204).end())
      .catch((error) => next(error));
  });
  
  /**
   * @swagger
   *
   * /v1/ranks/{id}:
   *   delete:
   *     description: delete rank
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
    rankService.deleteRank(req.params.id)
      .then(() => res.status(204).end())
      .catch((error) => next(error));
  });
  
  
  export default router;