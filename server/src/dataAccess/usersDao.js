import { models } from '../models/index.js';

const { users: usersModel } = models;

const getUsers = () => usersModel.findAll({
  attributes: ['id', 'name', 'surname', 'email', 'password', 'experience', 'image_url', 'description'],
});

const getUserById = (id) => usersModel.findAll({
  where: { id },
  attributes: ['id', 'name', 'surname', 'email', 'password', 'experience', 'image_url', 'description'],
});

const getUserByEmail = (email) => usersModel.findAll({
  where: { email },
  attributes: ['id', 'name', 'surname', 'email', 'password', 'experience', 'image_url', 'description'],
});

const createUser = (user) => usersModel.create(user);

const updateUser = (id, user) => usersModel.update(
  user,
  {
    where: { id },
    attributes: ['name', 'surname', 'email', 'experience', 'image_url', 'description'],

  },
);

const updateUserPassword = (id, newPassword) => usersModel.update({ password: newPassword }, { where: { id } });

const deleteUser = (id) => usersModel.destroy({
  where: { id },
  attributes: ['id', 'name', 'surname', 'email', 'password', 'experience', 'image_url', 'description'],
});

export default {
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  updateUserPassword,
  deleteUser,
};
