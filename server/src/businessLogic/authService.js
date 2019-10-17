import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config/env.js';
import usersService from '../businessLogic/usersService.js';
import randToken from 'rand-token';

const login = async (data) => {
  const user = await usersService.getUserByEmail(data.email);
  const userId = user[0].id;
  const compare = await bcrypt.compare(data.password, user[0].password);
  if (compare) {
  // const refreshToken = randToken.uid(50);
    const refreshToken = jwt.sign({ id: userId }, config.jwtRefreshSecret, { expiresIn: config.refreshTokenExpTime })
    const token = jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: config.tokenExpTime });
    return { refreshToken, token, userId };
  } else {
    return compare;
  }
}

export default {
  login,
};
