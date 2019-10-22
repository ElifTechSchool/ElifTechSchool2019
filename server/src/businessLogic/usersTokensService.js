import usersTokensDao from '../dataAccess/usersTokensDao.js'

const createUsersTokens = ({ userId, refreshToken }) => usersTokensDao.createUsersTokens({ userId, refreshToken });

const getUsersTokens = () => usersTokensDao.getUsersTokens();

const getTokensByUserId = (userId) => usersTokensDao.getTokensByUserId(userId);

const deleteUsersTokens = (id) => usersTokensDao.deleteUsersTokens(id);

export default {
  createUsersTokens,
  getUsersTokens,
  getTokensByUserId,
  deleteUsersTokens,
};
