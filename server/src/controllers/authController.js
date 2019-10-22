import express from 'express';
import usersService from '../businessLogic/usersService.js';
import authService from '../businessLogic/authService.js';
import usersTokensService from '../businessLogic/usersTokensService.js';

const router = express.Router();


/**
 * @swagger
 *
 * /v1/login:
 *   post:
 *     description: Get user by email
 *     tags:
 *       - auth
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: response
 *         schema:
 *           type: boolean
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
  try {
    const { refreshToken, token, userId } = await authService.login(req.body, next);
    const usersTokensData = await usersTokensService.getTokensByUserId(userId);
    if (usersTokensData) {
      if (userId === usersTokensData.user_id) {
        await usersTokensService.deleteUsersTokens(usersTokensData.id);
      }
    }
    await usersTokensService.createUsersTokens({ userId, refreshToken });
    res.send({ token, refreshToken });
  } catch (err) {
    res.status(401).end();
  }
});

export default router;
