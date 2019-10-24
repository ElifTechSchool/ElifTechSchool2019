import { models } from '../models/index.js';
import  Sequelize from 'sequelize'
const Op = Sequelize.Op;

const { users: usersModel, ranks: rankModel } = models;

const getRank = (experience) => rankModel.findOne({
  where: {
    experience: {
      [Op.lte]: experience,
    }
  },
  order: [
    ['experience', 'DESC'],
  ],
});

const getNextRank = (experience) => rankModel.findOne({
  where: {
    experience: {
      [Op.gt]: experience,
    }
  },
  order: [
    ['experience', 'ASC'],
  ],
});

const getHash = (id) => usersModel.findAll({
  where: { id },
  attributes: ['password'],
}).then(e => e[0].dataValues.password);

const getUsersPage = (offset, limit, search) => {
    return usersModel.findAndCountAll({
      ...search ? {
        where: {
          [Op.or]: {
            name: { [Op.iLike]: `%${search}%` },
            surname: { [Op.iLike]: `%${search}%` },
            email: { [Op.iLike]: `%${search}%` },
          },
        },
      } : {},
      offset,
      limit,
      order: [
        ['experience', 'DESC'],
      ],
      attributes: ['id', 'name', 'surname', 'email', 'password', 'experience', 'image_url', 'description'],
    });
}

const getUsers = () => {
  return usersModel.findAndCountAll({
    order: [
      ['experience', 'DESC'],
    ],
    attributes: ['id', 'name', 'surname', 'email', 'password', 'experience', 'image_url', 'description'],
  });
}

const getUserById = (id) => usersModel.findAll({
  where: { id },
  attributes: ['id', 'name', 'surname', 'email', 'password', 'experience', 'image_url', 'description'],
});

const getUserByEmail = (email) => usersModel.findAll({
  where: { email },
  attributes: ['id', 'name', 'surname', 'email', 'password', 'experience', 'image_url', 'description'],
});

const createUser = (user) => usersModel.create(user).catch(err => err);

const updateUser = (id, user) => usersModel.update(
  user,
  {
    where: { id },
    attributes: ['name', 'surname', 'email', 'image_url', 'description'],

  },
);

const updateUserPassword = (id, newPassword) => usersModel.update({ password: newPassword }, { where: { id } });

const deleteUser = (id) => usersModel.destroy({
  where: { id },
  attributes: ['id', 'name', 'surname', 'email', 'password', 'experience', 'image_url', 'description'],
});

export default {
  getRank,
  getNextRank,
  getHash,
  getUsers,
  getUsersPage,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  updateUserPassword,
  deleteUser,
};
