import { models } from '../models/index.js';
import Sequelize from 'sequelize';

const { users_roles: usersRoles } = models;

const createUserRoles = (roles) => usersRoles.bulkCreate(roles);

const getUserRoles = () => {
    return usersRoles.findAll({ raw: true });
};

const getRolesOfSpecificUser = (userId) => {
    console.log('userId', userId)
    return usersRoles.findAll({
        where: { user_id: userId },    
        attributes: [
          [Sequelize.fn('DISTINCT', Sequelize.col('role_id')), 'role_id'],
        ],
      }).then(result => result.map(col => col.role_id))

}

export default {
    createUserRoles,
    getUserRoles,
    getRolesOfSpecificUser,
}