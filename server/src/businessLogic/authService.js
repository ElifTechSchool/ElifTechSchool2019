import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config/env.js';
import usersService from '../businessLogic/usersService.js';
import usersRolesService from '../businessLogic/usersRolesService.js';
import randToken from 'rand-token';

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

const checkRoleUsers = async (req, res, next) => {
  try{
    const token = req.headers.authorization.split(' ')[1];
    const id = req.params.id;
    const method = req.method;
    const decoded = jwt.decode(token);
    const userRole = await usersRolesService.getRolesOfSpecificUser(decoded.id);

    if (method === 'PUT' && (userRole[0] !== 1 && userRole[0] !== 2 && decoded.id !== id)) {
      throw new Error('no rights to update');
    }
    else if (method === 'POST' && (userRole[0] !== 1 && userRole[0] !== 2)) {
      throw new Error('no rights to create');
    }
    else if (method === 'DELETE' && userRole[0] !== 1) {
      throw new Error('no rights to delete');
    }
  }
  catch (err) {
    res.status(403).send(err);
  }
};

export default {
  login,
  authUser,
  checkRoleUsers,
};
