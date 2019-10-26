import jwt from 'jsonwebtoken';
import usersTokensDao from '../dataAccess/usersTokensDao.js';
import config from '../../config/env.js';

const restoreTokens = async (refreshToken) => {
  const tokensData = await getToken(refreshToken);
  if (
    tokensData && tokensData.refresh_token === refreshToken
  ) {
    const expirationDate = tokensData.expiration_date;
    const difference = new Date(Date.now()).getMinutes() - new Date(expirationDate).getMinutes();
    const refreshTokenExpTime = 60 * 1440;
    if (difference >= refreshTokenExpTime) {
      throw new Error('refresh token expiered');
    }
    const token = jwt.sign({ id: tokensData.user_id }, config.jwtSecret, { expiresIn: config.tokenExpTime });
    await updateUserRefreshTokenExp({ userId: tokensData.user_id });
    return { token };
  } 
  throw new Error('refresh token is not valid');
};

const updateUserRefreshTokenExp = ({ userId }) => usersTokensDao
  .updateUserRefreshTokenExp({ userId });

const createUserToken = ({ userId, refreshToken }) => usersTokensDao.createUserToken({ userId, refreshToken });

const getUsersTokens = () => usersTokensDao.getUsersTokens();

const getTokenByUserId = (userId) => usersTokensDao.getTokenByUserId(userId);

const getToken = (refreshToken) => usersTokensDao.getToken(refreshToken);

const deleteUserToken = (id) => usersTokensDao.deleteUserToken(id);

export default {
  createUserToken,
  getUsersTokens,
  getToken,
  getTokenByUserId,
  deleteUserToken,
  restoreTokens,
  updateUserRefreshTokenExp,
};
