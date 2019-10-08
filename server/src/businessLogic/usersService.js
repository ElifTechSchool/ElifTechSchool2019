import bcrypt from 'bcrypt';
import usersDao from '../dataAccess/usersDao.js';

const hashPassword = (password) => bcrypt.hash(password, 10);
const getRank = (experience) => usersDao.getRank(experience).then(el => el);
const getNextRank = (experience) => usersDao.getNextRank(experience).then(el => el[0]);


const getUsers = (page, pageSize) => {
  const offset = (Number(page)-1) * pageSize;
  return usersDao.getUsers(offset, pageSize);
}

const getUserById = async (id) => {
  const user = await usersDao.getUserById(id).then(e => e[0]);
  const current = await getRank(user.dataValues.experience);
  const next = await getNextRank(user.dataValues.experience);
  return {user, userRank: {current, next}}
};

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
    const hash = await usersDao.getHash(req.params.id);
    console.log(hash);
    const check = await bcrypt.compare(req.body.oldPass, hash);
    console.log(check);
    if (check){
      const newPassword = await hashPassword(req.body.newPass);
      console.log(newPassword);
      usersDao.updateUserPassword(req.params.id, newPassword);
    } else {
      console.error('Wrong password');
    }
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
};
