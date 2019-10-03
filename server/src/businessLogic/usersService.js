import bcrypt from 'bcrypt';
import usersDao from '../dataAccess/usersDao.js';

const hashPassword = (password) => bcrypt.hash(password, 10);

const getUsers = () => usersDao.getUsers();

const getUserById = (id) => usersDao.getUserById(id);

const getUserByEmail = (email) => usersDao.getUserByEmail(email);

const createUser = async (req) => {
  try{
    const userData = JSON.parse(req.body.user);
    userData.image_url = req.file.secure_url;
    userData.password = await hashPassword(userData.password);
    usersDao.createUser(userData);
  }
  catch (err) {
    console.log(err);
  }
};

const updateUser = async (req) => {
  const userData = JSON.parse(req.body.user);
  if (req.file) {
    userData.image_url = req.file.secure_url;
  }
  usersDao.updateUser(req.params.id, userData);
};

const updateUserPassword = async (req) => {
  try {
    const newPassword = await hashPassword(req.body.newPassword);
    usersDao.updateUserPassword(req.params.id, newPassword);
  }
  catch (err) {
    console.log(err);
  }
};

const deleteUser = (id) => usersDao.deleteUser(id);

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
