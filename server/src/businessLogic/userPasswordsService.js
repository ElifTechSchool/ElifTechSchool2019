import config from '../../config/env.js';
import nodemailer from 'nodemailer';
import ejs from 'ejs';
import usersService from './usersService.js';
import jwt from 'jsonwebtoken';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: config.email,
        pass: config.emailPass,
    }
});

const sendEmailToResetPass = async (email) => {
    const user = await usersService.getUserByEmail(email);

    const token = jwt.sign({ email: user.email }, user.password, { expiresIn: config.tokenExpTime });
    const emailFile = await ejs.renderFile("files/passReset.ejs", { token, frontEndUrl: config.frontEndUrl });

    const info = await transporter.sendMail({
        from: '"Eliftech School 2019 👻" <no-reply@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'Password reset', // Subject line
        html: emailFile // html body
    });
    console.log('Message sent: %s', info.messageId);
};

const changeUserPassword = async (newPass, token) => {
    const decoded = jwt.decode(token);
    const user = await usersService.getUserByEmail(decoded.email);

    const tokenCheck = jwt.verify(token, user.password)
    if (!tokenCheck) {
        throw new Error('token is not valid')
    }
    usersService.updateUserPassword(user.id, undefined, newPass);
    await transporter.sendMail({
        from: '"Eliftech School 2019 👻" <no-reply@gmail.com>', // sender address
        to: user.email, // list of receivers
        subject: 'Password reset success!', // Subject line
        html: "<h1> Your password has been reset successfully! </h1>" // html body
    });
}

export default {
    sendEmailToResetPass,
    changeUserPassword,
};