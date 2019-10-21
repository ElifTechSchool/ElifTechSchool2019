import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config/env.js';
import usersService from '../businessLogic/usersService.js';
import nodemailer from 'nodemailer';
import ejs from 'ejs';
import randToken from 'rand-token';

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

const authUser = async (query) => {
  try {
    const decoded = jwt.verify(query.token, config.jwtSecret);
    const user = await usersService.getUserById(decoded.id);
    return user;
  } catch (e) {
    return res.status(401).send('unauthorized');
  }
};

const passwordToken = async (email) => {
  const user = await usersService.getUserByEmail(email);
  if (user[0] === undefined) {
    throw new Error('no such user');
  }
  const token = jwt.sign({ email: user.email }, user.password, { expiresIn: config.tokenExpTime });

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
    subject: 'Hello ✔ Hello', // Subject line
    html: emailFile // html body
  });
  console.log('Message sent: %s', info.messageId);
};

export default {
  login,
  authUser,
  passwordToken,
};
