import { models } from '../models/index.js';

const { users_tokens: usersTokensModel } = models;

const createUsersTokens = ({ userId, refreshToken }) => usersTokensModel
  .create({ user_id: userId, refresh_token: refreshToken, expiration_date: new Date(Date.now()).toISOString() });

const getUsersTokens = () => usersTokensModel.findAll({ raw: true });

const getTokensByUserId = (userId) => usersTokensModel.findOne({
  where: { user_id: userId },
});

const deleteUsersTokens = (id) => usersTokensModel.destroy({
  where: { id },
});

export default {
  createUsersTokens,
  getUsersTokens,
  getTokensByUserId,
  deleteUsersTokens,
};
