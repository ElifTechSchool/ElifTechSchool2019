import jwt from 'jsonwebtoken';
import config from '../../config/env.js';
import usersService from '../businessLogic/usersService.js';

const anauthrizedResponse = (res) => res.status(403).send({ message: 'Unauthorized' });

export default async function authMiddleware(req, res, next) {
  if (req.url.includes('login')) {
    return next();
  }
  let token = req.headers.authorization;
  if (!token) {
    return anauthrizedResponse(res);
  }
  if (token && token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
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
}
