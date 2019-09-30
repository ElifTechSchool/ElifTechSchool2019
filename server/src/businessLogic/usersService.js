import bcrypt from 'bcrypt';
import usersDao from '../dataAccess/usersDao.js';

const getUsers = () => usersDao.getUsers();

const getUserById = (id) => usersDao.getUserById(id);

const getUserByEmail = (email) => usersDao.getUserByEmail(email);

const createUser = (user) => usersDao.createUser(user);

const updateUser = (id, user) => usersDao.updateUser(id, user);

const updateUserPassword = (id, newPassword) => usersDao.updateUserPassword(id, newPassword);

const deleteUser = (id) => usersDao.deleteUser(id);

const hashPassword = (password) => bcrypt.hash(password, 10);

export default {
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  updateUserPassword,
  deleteUser,
  hashPassword,
};
