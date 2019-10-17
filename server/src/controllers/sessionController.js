import express from 'express';
import jwt from 'jsonwebtoken';
import sessionService from '../businessLogic/sessionService.js';
import config from '../../config/env.js';

const router = express.Router();

router.get('/', (req, res, next) => {
  sessionService.getSessions(req.query)
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
 *       - session
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
router.post('/', async (req, res) => {
  try {
    const decoded = jwt.verify(req.body.refreshToken, config.jwtRefreshSecret);
    const browserInfo = req.headers['user-agent'];
    const sessionData = await sessionService.getSessionByUserIdAndBrowser(decoded.id, browserInfo);
    if (
      sessionData && sessionData.refresh_token === req.body.refreshToken
    ) {
      const token = jwt.sign({ id: sessionData.user_id }, config.jwtSecret, { expiresIn: config.tokenExpTime });
      res.send({ token });
    } else {
      throw new Error('refresh token is not valid');
    }
  } catch (error) {
    res.send({ error });
  }
});

export default router;