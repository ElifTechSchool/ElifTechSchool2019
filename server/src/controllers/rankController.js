import express from 'express';
import rankService from '../businessLogic/rankService.js';
import upload from '../businessLogic/cloudinaryService.js';

const router = express.Router();

/**
 * @swagger
 *
 * /v1/ranks:
 *   get:
 *     description: Get ranks
 *     tags:
 *       - ranks
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
 *                name:
 *                  type: string
 *                experience:
 *                  type: number
 *                number:
 *                  type: number
 *                photo_url:
 *                  type: string
 *                photo_id:
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
  rankService
    .getRanks(req.query)
    .then((result) => res.json(result))
    .catch((error) => next(error));
});

/**
 * @swagger
 *
 * /v1/ranks/{id}:
 *   get:
 *     description: Get rank by id
 *     tags:
 *       - ranks
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
 *             photo_id:
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
  rankService
    .getRankById(req.params.id)
    .then((result) => res.json(result))
    .catch((error) => next(error));
});

/**
 * @swagger
 *
 * /v1/ranks:
 *   post:
 *     description: add rank
 *     tags:
 *       - ranks
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: name
 *         in: formData
 *         required: true
 *         type: string
 *       - name: experience
 *         in: formData
 *         required: true
 *         type: number
 *       - name: image
 *         in: formData
 *         type: file
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
router.post('/', upload.single('image'), (req, res, next) => {
  req.body.photo_url = req.file.secure_url;
  req.body.photo_id = req.file.public_id;
  rankService
    .createRank(req.body)
    .then(() => res.status(201).end())
    .catch((error) => next(error));
});

/**
 * @swagger
 *
 * /v1/ranks/{id}:
 *   put:
 *     description: update rank
 *     tags:
 *       - ranks
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: number
 *       - name: name
 *         in: formData
 *         type: string
 *       - name: experience
 *         in: formData
 *         type: number
 *       - name: image
 *         in: formData
 *         type: file
 *     responses:
 *       204:
 *         description: update success
 *       401:
 *         description: Unauthorized access
 *         schema:
 *           $ref: '#/definitions/401'
 *       500:
 *         description: Server error
 *         schema:
 *           $ref: '#/definitions/500'
 */
router.put('/:id', upload.single('image'), (req, res, next) => {
  if (req.file) {
    req.body.photo_url = req.file.secure_url;
    req.body.photo_id = req.file.public_id;
  }
  rankService
    .updateRank(req.params.id, req.body)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

/**
 * @swagger
 *
 * /v1/ranks/{id}:
 *   delete:
 *     description: delete rank
 *     tags:
 *       - ranks
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
  rankService
    .deleteRank(req.params.id)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

export default router;
