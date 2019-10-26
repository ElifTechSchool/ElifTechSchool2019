import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config/env.js';
import usersService from '../businessLogic/usersService.js';
import usersRolesService from '../businessLogic/usersRolesService.js';

const login = async (data, next) => {
  const user = await usersService.getUserByEmail(data.email);
  const userId = user.id;
  const compare = await bcrypt.compare(data.password, user.password);
  if (compare) {
    const refreshToken = jwt.sign({ id: userId }, config.jwtRefreshSecret, { expiresIn: config.refreshTokenExpTime });
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

const checkRole = async (token) => {
  const decoded = jwt.decode(token);
  const userRole = await usersRolesService.getRolesOfSpecificUser(decoded.id);
}

export default {
  login,
  authUser,
  checkRole
};
