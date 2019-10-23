import express from 'express';
import usersService from '../businessLogic/usersService.js';
import authService from '../businessLogic/authService.js';
import sessionService from '../businessLogic/sessionService.js';

const router = express.Router();


/**
 * @swagger
 *
 * /v1/login:
 *   post:
 *     description: Get user by email
 *     tags:
 *       - auth
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: response
 *         content:
 *           application/json:
 *             schema:
 *               type: boolean
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
router.post('/', async (req, res, next) => {
  try {
    const { refreshToken, token, userId } = await authService.login(req.body, next);
    const browserInfo = req.headers['user-agent'];
    const sessionData = await sessionService.getSessionByUserIdAndBrowser(userId, browserInfo);
    if (sessionData != null) {
      if (userId === sessionData.user_id && browserInfo === sessionData.browser_info) {
        await sessionService.deleteOldSession(sessionData.id);
      }
    }
    await sessionService.createSession({ userId, refreshToken, browserInfo });
    res.send({ token, refreshToken });
  } catch (err) {
    res.status(401).end();
  }
});

export default router;
