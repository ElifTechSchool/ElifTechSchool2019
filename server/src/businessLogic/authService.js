import bcrypt from 'bcrypt';
import config from '../../config/env.js';
import usersService from '../businessLogic/usersService.js';
import jwt from 'jsonwebtoken';
import randToken from 'rand-token';

const login = async (data) => {
    const user = await usersService.getUserByEmail(data.email);
    const compare = await bcrypt.compare(data.password, user[0].password);
    if (compare){
        const refreshToken = randToken.uid(50);
        const token = jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: config.tokenExpTime });
        return { refreshToken, token }
    } else {
        return compare;
    }
}

export default {
  login,
};
