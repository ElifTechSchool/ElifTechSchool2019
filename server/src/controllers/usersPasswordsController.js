import express from 'express';
import authService from '../businessLogic/authService.js';

const router = express.Router();

/**
 * @swagger
 *
 * /v1/users/passwords:
 *   post:
 *     description: Get email to reset user password
 *     tags:
 *       - usersPasswords
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

router.post('/', async (req, res, next) => {
    authService
        .passwordToken(req.body.email)
        .then(() => res.status(200).end())
        .catch((error) => next(error));
});

/**
 * @swagger
 *
 * /v1/users/passwords:
 *   put:
 *     description: reset user password
 *     tags:
 *       - usersPasswords
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

router.put('/', async (req, res, next) => {
    authService
        .changeUserPassword(req.body.newPass, req.body.token)
        .then(() => res.status(204).end())
        .catch((error) => next(error));
});

export default router;
