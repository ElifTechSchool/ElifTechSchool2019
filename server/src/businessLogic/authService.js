import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import randToken from 'rand-token';
import config from '../../config/env.js';
import usersService from '../businessLogic/usersService.js';

const login = async (data, next) => {
  const user = await usersService.getUserByEmail(data.email);
  const userId = user.id;
  const compare = await bcrypt.compare(data.password, user.password);
  if (compare) {
    const refreshToken = randToken.generate(50);
    const token = jwt.sign({ id: userId }, config.jwtSecret, { expiresIn: config.tokenExpTime });
    return { refreshToken, token, userId };
  }
  else {
    return compare;
  }
}

const authUser = async (id) => {
  return usersService.getUserById(id);
};

export default {
  login,
  authUser,
};
