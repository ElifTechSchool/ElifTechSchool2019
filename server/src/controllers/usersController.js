import express from 'express';
import usersService from '../businessLogic/usersService.js';
import authService from '../businessLogic/authService.js';
import upload from '../businessLogic/cloudinaryService.js';
import usersRolesService from '../businessLogic/usersRolesService.js';
import userAchievementsService from '../businessLogic/userAchievementsService.js';
import achievementsService from '../businessLogic/achievementsService.js';

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
router.get('/me', (req, res, next) => {
  authService.authUser(req.query)
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
 * /v1/users/passwords:
 *   put:
 *     description: update users roles
 *     tags:
 *       - users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               format: email
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

router.put('/passwords', async (req, res, next) => {
  authService
    .passwordToken(req.body.email)
    .then(() => res.status(204).end())
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
    .updateUserPassword(req, res, next)
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


/**
 * @swagger
 *
 * /v1/users/{id}/roles:
 *   put:
 *     description: update users roles
 *     tags:
 *       - users_roles
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: array
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             roles:
 *               type: array
 *               items:
 *                 type: number
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

router.put('/:id/roles', async (req, res, next) => {
  const userId = req.params.id;
  const { roles } = req.body;
  if (!userId || !Array.isArray(roles)) {
    res.status(401).send({ error: 'incorest data' });
  }
  usersRolesService.deleteRolesByUser(userId);
  usersRolesService.createUserRoles(
    roles.map((role) => ({ role_id: role, user_id: userId })),
  )
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

/**
 * @swagger
 *
 * /v1/users/{id}/roles:
 *   get:
 *     description: Get roles by id user
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
 *             roles:
 *               type: array
 *               items:
 *                 type: number
 *       401:
 *         description: Unauthorized access
 *         schema:
 *           $ref: '#/definitions/401'
 *       500:
 *         description: Server error
 *         schema:
 *           $ref: '#/definitions/500'
 */
router.get('/:id/roles', (req, res, next) => {
  usersRolesService.getRolesOfSpecificUser(req.params.id)
    .then((result) => res.json(result))
    .catch((error) => next(error));
});

/**
 * @swagger
 *
 * /v1/users/{id}/achievements:
 *   get:
 *     description: Get achievements by id user
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
 *             roles:
 *               type: array
 *               items:
 *                 type: string
 *       401:
 *         description: Unauthorized access
 *         schema:
 *           $ref: '#/definitions/401'
 *       500:
 *         description: Server error
 *         schema:
 *           $ref: '#/definitions/500'
 */
router.get('/:id/achievements', (req, res, next) => {
  userAchievementsService.getAchievementsByUserId(req.params.id)
    .then((result) => res.json(result))
    .catch((error) => next(error));
});

router.post('/:userId/achievements/:achievementId', async (req, res) => {
  try {
    const { userId, achievementId } = req.params;
    if (!userId || !achievementId) {
      res.send({ message: 'incorrect input: missing userId or achievementId' });
    }
    const user = await usersService.getUserById(userId);
    const achievement = await achievementsService.getAchievementById(achievementId);
    res.send({
      user: !!user,
      achievement: !!achievement.length,
    });

  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

export default router;
