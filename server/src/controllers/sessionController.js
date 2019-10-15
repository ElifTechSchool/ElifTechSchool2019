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

router.post('/', async (req, res) => {
  try {
    const decoded = jwt.verify(req.body.refreshToken, config.jwtRefreshSecret);
    const sessionData = await sessionService.getSessionByUserId(decoded.id);
    if (
        sessionData && 
        sessionData.refresh_token === req.body.refreshToken
      ) {
        const token = jwt.sign({ id: sessionData.user_id }, config.jwtSecret, { expiresIn: config.tokenExpTime });
        res.send({ token });
    } else {
        throw new Error('refresh token is not valid')
    }
  
  } catch (error) {
    console.log(error)
    res.send({ error })
  }
});

export default router;