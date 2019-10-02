import express from 'express';
import usersService from '../businessLogic/usersService.js';
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
  usersService
    .getUsers()
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
  usersService
    .getUserById(req.params.id)
    .then((result) => res.json(result[0]))
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
 *       - name: surname
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         in: formData
 *         required: true
 *         type: string
 *       - name: image_url
 *         in: formData
 *         required: true
 *         type: file
 *       - name: description
 *         in: formData
 *         required: true
 *         type: string
 *       - name: experience
 *         in: formData
 *         required: false
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
router.post('/', upload.single('image_url'), async (req, res, next) => {
  const userData = JSON.parse(req.body.user);
  userData.image_url = req.file.secure_url;

  try {
    userData.password = await usersService.hashPassword(userData.password);
    usersService
      .createUser(userData)
      .then(() => res.status(201).end())
      .catch((error) => next(error));
  } catch (err) {
    console.log(err);
  }
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
 *       - name: name
 *         in: formData
 *         required: true
 *         type: string
 *       - name: surname
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         in: formData
 *         required: true
 *         type: string
 *       - name: image_url
 *         in: formData
 *         required: true
 *         type: file
 *       - name: description
 *         in: formData
 *         required: true
 *         type: string
 *       - name: experience
 *         in: formData
 *         required: false
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
router.put('/:id', upload.single('image_url'), async (req, res, next) => {
  const userData = JSON.parse(req.body.user);
  if (req.file) {
    userData.image_url = req.file.secure_url;
  }
  usersService
    .updateUser(req.params.id, userData)
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
 *             password:
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
router.put('/:id/passwords', async (req, res, next) => {
  console.log(req.body);
  try {
    const newPassword = await usersService.hashPassword(req.body.password);
    usersService
      .updateUserPassword(req.params.id, newPassword)
      .then(() => res.status(204).end())
      .catch((error) => next(error));
  } catch (err) {
    console.log(err);
  }
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
