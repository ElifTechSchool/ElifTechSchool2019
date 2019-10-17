import jwt from 'jsonwebtoken';
import config from '../../config/env.js';
import usersService from '../businessLogic/usersService.js';

const anauthrizedResponse = (res) => res.status(403).send({ message: 'Anauthrized' });

export default async function authMiddleware (req, res, next) {
  try {
    const token = req.headers['authorization']
    if (!token) {
      return anauthrizedResponse(res);
    }
    const decoded = jwt.verify(token, config.jwtSecret);
    const userData = await usersService.getUserById(decoded.id);
    if (userData && userData.user && userData.user.id) {
      if (!res.locals) res.locals = {};
      res.locals.userId = userData.user.id;
      next();
      return;
    }
    anauthrizedResponse(res);
  } catch (err) {
    res.status(500).send(err);
  }
}