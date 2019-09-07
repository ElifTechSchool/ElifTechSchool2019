import express from 'express';
import usersService from '../businessLogic/usersService.js';

const router = express.Router();

/**
 * @swagger
 *
 * /v1/users:
 *   get:
 *     description: Get users
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
 *                surname:
 *                  type: string
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *                experience:
 *                  type: number
 *                image_url:
 *                  type: string
 *                description:
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
  usersService.getUsers()
    .then((result) => res.json(result))
    .catch((error) => next(error));
});

/**
 * @swagger
 *
 * /v1/users/{id}:
 *   get:
 *     description: Get user by id
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
 *             surname:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *             experience:
 *               type: number
 *             image_url:
 *               type: string
 *             description:
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
  usersService.getUserById(req.params.id)
    .then((result) => res.json(result))
    .catch((error) => next(error));
});

/**
 * @swagger
 *
 * /v1/users:
 *   post:
 *     description: add user
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
 *             name:
 *               type: string
 *             surname:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *             image_url:
 *               type: string
 *             description:
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
  usersService.createUser(req.body)
    .then(() => res.status(201).end())
    .catch((error) => next(error));
});

/**
 * @swagger
 *
 * /v1/users/{id}:
 *   put:
 *     description: update user
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
 *             name:
 *               type: string
 *             surname:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *             experience:
 *               type: number
 *             image_url:
 *               type: string
 *             description:
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
  usersService.updateUser(req.params.id, req.body)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

/**
 * @swagger
 *
 * /v1/users/{id}:
 *   delete:
 *     description: delete user
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
  usersService.deleteUser(req.params.id)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});


export default router;
