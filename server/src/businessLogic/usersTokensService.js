import usersTokensDao from '../dataAccess/usersTokensDao.js'

const createUserToken = ({ userId, refreshToken }) => usersTokensDao.createUserToken({ userId, refreshToken });

const getUsersTokens = () => usersTokensDao.getUsersTokens();

const getTokenByUserId = (userId) => usersTokensDao.getTokenByUserId(userId);

const deleteUserToken = (id) => usersTokensDao.deleteUserToken(id);

export default {
  createUserToken,
  getUsersTokens,
  getTokenByUserId,
  deleteUserToken,
};
