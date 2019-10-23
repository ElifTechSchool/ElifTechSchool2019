import express from 'express';
import jwt from 'jsonwebtoken';
import usersTokensService from '../businessLogic/usersTokensService.js';
import config from '../../config/env.js';

const router = express.Router();

router.get('/', (req, res, next) => {
  usersTokensService.getUsersTokens(req.query)
    .then((data) => res.json({ data }))
    .catch((error) => next(error));
});

/**
 * @swagger
 *
 * /v1/tokens:
 *   post:
 *     description: Get token from refresh token
 *     tags:
 *       - users_tokens
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: refreshToken
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             refreshToken:
 *               type: string
 *     responses:
 *       200:
 *         description: created token success
 *       401:
 *         description: Unauthorized access
 *         schema:
 *           $ref: '#/definitions/401'
 *       500:
 *         description: Server error
 *         schema:
 */

router.post('/', (req, res, next) => {
  usersTokensService.restoreTokens(req.body.refreshToken)
    .then(({ token, refreshToken }) => res.status(201).send({ token, refreshToken }))
    .catch((error) => next(error));
});

export default router;
