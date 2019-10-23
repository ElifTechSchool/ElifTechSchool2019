import jwt from 'jsonwebtoken';
import usersTokensDao from '../dataAccess/usersTokensDao.js';
import config from '../../config/env.js';

const restoreTokens = async (refreshToken) => {
  const decoded = jwt.verify(refreshToken, config.jwtRefreshSecret);
  const tokensData = await getTokenByUserId(decoded.id);
  if (
    tokensData && tokensData.refresh_token === refreshToken
  ) {
    const token = jwt.sign({ id: tokensData.user_id }, config.jwtSecret, { expiresIn: config.tokenExpTime });
    const refreshToken = jwt.sign({ id: tokensData.user_id }, config.jwtRefreshSecret, { expiresIn: config.refreshTokenExpTime });
    await updateUserRefreshToken({ userId: tokensData.user_id, refreshToken });
    return { token, refreshToken };
  } else {
    throw new Error('refresh token is not valid');
  }
};

const updateUserRefreshToken = ({ userId, refreshToken }) => usersTokensDao.updateUserRefreshToken({ userId, refreshToken })

const createUserToken = ({ userId, refreshToken }) => usersTokensDao.createUserToken({ userId, refreshToken });

const getUsersTokens = () => usersTokensDao.getUsersTokens();

const getTokenByUserId = (userId) => usersTokensDao.getTokenByUserId(userId);

const deleteUserToken = (id) => usersTokensDao.deleteUserToken(id);

export default {
  createUserToken,
  getUsersTokens,
  getTokenByUserId,
  deleteUserToken,
  restoreTokens,
  updateUserRefreshToken,
};
