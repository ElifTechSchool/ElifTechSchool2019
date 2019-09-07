import { models } from '../models/index.js';

const { users: usersModel } = models;

const getUsers = () => usersModel.findAll();

const getUserById = (id) => usersModel.findAll({
  where: { id },
});

const createUser = (user) => usersModel.create(user);

const updateUser = (id, user) => usersModel.update(
  user,
  {
    where: { id },
  },
);

const deleteUser = (id) => usersModel.destroy({
  where: { id },
});

export default {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
