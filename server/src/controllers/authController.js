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
router.post('/', async (req, res) => {
  try {
    const result = await authService.login(req.body);
    const { userId, token, refreshToken } = result;
    const browserInfo = req.headers['user-agent'];
    const sessionData = await sessionService.getSessionByUserIdAndBrowser(userId, browserInfo);
    if (sessionData != null) {
      if (userId === sessionData.user_id && browserInfo === sessionData.browser_info) {
        await sessionService.deleteOldSession(sessionData.id);
      }
    }
    await sessionService.createSession({ userId, refreshToken, browserInfo });
    if (result) {
      res.send({ token, refreshToken });
    } else {
      res.status(401).end();
    }
  } catch (err) {
    console.log(err);
  }
});

export default router;
