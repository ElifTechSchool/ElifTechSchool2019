import Sequelize from 'sequelize';
import { models } from '../models/index.js';

const { users_roles: usersRoles } = models;

const createUserRoles = (roles) => usersRoles.bulkCreate(roles);

const getUserRoles = () => usersRoles.findAll({ raw: true });

const getRolesOfSpecificUser = (userId) => usersRoles.findAll({
  where: { user_id: userId },
  attributes: [
    [Sequelize.fn('DISTINCT', Sequelize.col('role_id')), 'role_id'],
  ],
}).then((result) => result.map((col) => col.role_id));

export default {
  createUserRoles,
  getUserRoles,
  getRolesOfSpecificUser,
};
