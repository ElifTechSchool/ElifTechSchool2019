import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import ejs from 'ejs';
import config from '../../config/env.js';
import usersService from './usersService.js';

const login = async (data, next) => {
  const user = await usersService.getUserByEmail(data.email);
  if (user[0].id === undefined) {
    throw new Error('no such user');
  }
  const userId = user[0].id;
  const compare = await bcrypt.compare(data.password, user[0].password);
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

const passwordToken = async (email) => {
  const user = await usersService.getUserByEmail(email);
  if (user[0] === undefined) {
    throw new Error('no such user');
  }
  const token = jwt.sign({ email: user[0].email }, user[0].password, { expiresIn: config.tokenExpTime });

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: config.email,
      pass: config.emailPass,
    }
  });
  const emailFile = await ejs.renderFile("files/passReset.ejs", { token: token });

  const info = await transporter.sendMail({
    from: '"Eliftech School 2019 👻" <no-reply@gmail.com>', // sender address
    to: email, // list of receivers
    subject: 'Password reset', // Subject line
    html: emailFile // html body
  });
  console.log('Message sent: %s', info.messageId);
};

const changeUserPassword = async (newPass, token) => {
  try {
    const decoded = jwt.decode(token);
    const user = await usersService.getUserByEmail(decoded.email);
    // if user exist
    // validate token user.password
    usersService.updateUserPassword(user[0].id, undefined, newPass)
  } catch (e) {
    return res.status(401).send(e);
  }
}

export default {
  login,
  authUser,
  passwordToken,
  changeUserPassword
};
