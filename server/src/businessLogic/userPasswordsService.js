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

const passwordToken = async (email) => {
    const user = await usersService.getUserByEmail(email);
    if (user[0] === undefined) {
        throw new Error('no such user');
    }
    const token = jwt.sign({ email: user[0].email }, user[0].password, { expiresIn: config.tokenExpTime });

    
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
        if (user[0] === undefined) {
            throw new Error('no such user');
        }
        const tokenCheck = jwt.verify(token, user[0].password)
        if (!tokenCheck) {
            throw new Error('token is not valid')
        }
        usersService.updateUserPassword(user[0].id, undefined, newPass);
        await transporter.sendMail({
            from: '"Eliftech School 2019 👻" <no-reply@gmail.com>', // sender address
            to: user[0].email, // list of receivers
            subject: 'Password reset success!', // Subject line
            html: "<h1> Your password has been reset successfully! </h1>" // html body
        });
    } catch (e) {
        return res.status(401).send(e);
    }
}

export default {
    passwordToken,
    changeUserPassword,
};