import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import usersDao from '../dataAccess/usersDao.js';

const hashPassword = (password) => bcrypt.hash(password, 10);
const getRank = (experience) => usersDao.getRank(experience).then(el => el);
const getNextRank = (experience) => usersDao.getNextRank(experience).then(el => el);


const getUsers = (query) => {
  if(query.page){
    const offset = (Number(query.page) - 1) * query.pageSize;
    return usersDao.getUsersPage(offset, query.pageSize, query.search)
  }
  else {
    return usersDao.getUsers()
  }
}

const getUserById = async (id) => {
  const user = await usersDao.getUserById(id).then(e => e[0]);
  if (!user) return null;
  const current = await getRank(user.dataValues.experience);
  const next = await getNextRank(user.dataValues.experience);
  return {user, userRank: {current, next}}
};

const getUserByEmail = (email) => usersDao.getUserByEmail(email);

const createUser = async (req) => {
    const userData = req.body;
    Object.setPrototypeOf(userData, {});    
    userData.password = await hashPassword(userData.password);
    if (req.file) {
      userData.image_url = req.file.secure_url;
    } 
    usersDao.createUser(userData);
};

const updateUser = async (req) => {
  const userData = req.body;
  if (req.file) {
    userData.image_url = req.file.secure_url;
  }
  usersDao.updateUser(req.params.id, userData);
};

const updateUserPassword = async (id, oldPass, newPass) => {
  try {
    const hash = await usersDao.getHash(id);
    if(oldPass){
      const check = await bcrypt.compare(oldPass, hash);
      if (!check) {
        throw new Error('Wrong password');
      }
      const newPassword = await hashPassword(newPass);
      usersDao.updateUserPassword(id, newPassword);
    } else {
      const newPassword = await hashPassword(newPass);
      usersDao.updateUserPassword(id, newPassword);
    }
  }
  catch (err) {
    return err;
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
};
