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
 *                    experience:
 *                      type: number
 *                    number:
 *                      type: number
 *                    photo_url:
 *                      type: string
 *                    photo_id:
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
  rankService
    .getRanks()
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
 *                 name:
 *                   type: string
 *                 experience:
 *                   type: number
 *                 number:
 *                   type: number
 *                 photo_url:
 *                   type: string
 *                 photo_id:
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
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               experience:
 *                 type: number
 *               number:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
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
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               experience:
 *                 type: number
 *               number:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       204:
 *         description: update success
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
  rankService
    .deleteRank(req.params.id)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

export default router;
