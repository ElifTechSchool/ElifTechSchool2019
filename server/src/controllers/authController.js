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
    const userTokenData = await usersTokensService.getTokenByUserId(userId);
    if (userTokenData) {
      if (userId === userTokenData.user_id) {
        await usersTokensService.deleteUserToken(userTokenData.id);
      }
    }
    await usersTokensService.createUserToken({ userId, refreshToken });
    res.send({ token, refreshToken });
  } catch (err) {
    next(err);
  }
});

export default router;
