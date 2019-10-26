import express from 'express';
import usersService from '../businessLogic/usersService.js';
import authService from '../businessLogic/authService.js';
import upload from '../businessLogic/cloudinaryService.js';

const router = express.Router();

/**
 * @swagger
 *
 * /v1/users:
 *   get:
 *     description: Get users
 *     tags:
 *       - users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: page
 *         in: query
 *         type: number
 *         default: 1
 *       - name: pageSize
 *         in: query
 *         default: 4
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
  usersService
    .getUsers(req.query)
    .then((result) => res.json(result))
    .catch((error) => next(error));
});

/**
 * @swagger
 *
 * /v1/users/me:
 *   get:
 *     description: Authenticate user by token
 *     tags:
 *       - users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: query
 *         required: true
 *         type: string
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
router.get('/me', (req, res, next) => {
  authService.authUser(req.user.id)
    .then((result) => res.json(result))
    .catch((error) => next(error));
});

/**
 * @swagger
 *
 * /v1/users/{id}:
 *   get:
 *     description: Get user by id
 *     tags:
 *       - users
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
  console.log(req.headers.authorization.split(' ')[1]);
  usersService
    .getUserById(req.params.id)
    .then((result) => res.json(result))
    .catch((error) => next(error));
});

/**
 * @swagger
 *
 * /v1/users:
 *   post:
 *     description: add user
 *     tags:
 *       - users
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: name
 *         in: formData
 *         required: true
 *         type: string
 *         minLength: 3
 *       - name: surname
 *         in: formData
 *         required: true
 *         type: string
 *         minLength: 3
 *       - name: email
 *         in: formData
 *         required: true
 *         type: string
 *         format: email
 *       - name: password
 *         in: formData
 *         required: true
 *         type: string
 *         minLength: 6
 *       - name: image_url
 *         in: formData
 *         required: true
 *         type: file
 *       - name: description
 *         in: formData
 *         type: string
 *       - name: experience
 *         in: formData
 *         required: false
 *         type: number
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
  usersService
    .createUser(req)
    .then(() => res.status(201).end())
    .catch((error) => next(error));
});

/**
 * @swagger
 *
 * /v1/users/{id}:
 *   put:
 *     description: update user
 *     tags:
 *       - users
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
 *       - name: surname
 *         in: formData
 *         type: string
 *       - name: email
 *         in: formData
 *         type: string
 *         format: email
 *       - name: image_url
 *         in: formData
 *         type: file
 *       - name: description
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
  usersService
    .updateUser(req)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

/**
 * @swagger
 *
 * /v1/users/{id}/passwords:
 *   put:
 *     description: update user's password
 *     tags:
 *       - users
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
 *             oldPass:
 *               type: string
 *               minLength: 6
 *               required: true
 *             newPass:
 *               type: string
 *               minLength: 6
 *               required: true
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
router.put('/:id/passwords', async (req, res, next) => {
  usersService
    .updateUserPassword(req.params.id, req.body.oldPass, req.body.newPass)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

/**
 * @swagger
 *
 * /v1/users/{id}/experience:
 *   put:
 *     description: update user's experience
 *     tags:
 *       - users
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
 *             experience:
 *               type: number
 *               required: true
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
router.put('/:id/experience', async (req, res, next) => {
  usersService
    .addUserExperience(req.params.id, req.body.experience)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

/**
 * @swagger
 *
 * /v1/users/{id}:
 *   delete:
 *     description: delete user
 *     tags:
 *       - users
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
  usersService
    .deleteUser(req.params.id)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

export default router;
