import bcrypt from 'bcrypt';
import usersDao from '../dataAccess/usersDao.js';

const hashPassword = (password) => bcrypt.hash(password, 10);
const getRank = (experience) => usersDao.getRank(experience).then(el => el);
const getNextRank = (experience) => usersDao.getNextRank(experience).then(el => el);


const getUsers = (query) => {
  const offset = (Number(query.page)-1) * query.pageSize;
  return usersDao.getUsers(offset, query.pageSize, query.search);
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
    const userData = req.body;
    Object.setPrototypeOf(userData, {});
    userData.password = await hashPassword(userData.password); 
    userData.image_url = req.file.secure_url;
    usersDao.createUser(userData);
  }
  catch (err) {
    console.log(err);
  }
};

const updateUser = async (req) => {
  const userData = req.body;
  if (req.file) {
    userData.image_url = req.file.secure_url;
  }
  usersDao.updateUser(req.params.id, userData);
};

const updateUserPassword = async (req, res, next) => {
  try {
    const hash = await usersDao.getHash(req.params.id);
    const check = await bcrypt.compare(req.body.oldPass, hash);
    if (check){
      const newPassword = await hashPassword(req.body.newPass);
      usersDao.updateUserPassword(req.params.id, newPassword);
    } else {
      res.status(401);
      res.send({message: 'Wrong password'});
    }
  }
  catch (err) {
    next(err);
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
