import bcrypt from 'bcrypt';

const hash = (password) => bcrypt.hash(password, 10);
const login = (newPass, userPass) => bcrypt.compare(newPass, userPass);

export default {
  hash,
  login,
};
