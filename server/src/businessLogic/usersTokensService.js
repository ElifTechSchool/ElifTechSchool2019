import jwt from 'jsonwebtoken';
import usersTokensDao from '../dataAccess/usersTokensDao.js';
import config from '../../config/env.js';

const restoreTokens = async (refreshToken) => {
  const decoded = jwt.verify(refreshToken, config.jwtRefreshSecret);
  const tokensData = await getTokenByUserId(decoded.id);
  const expirationDate = tokensData.expiration_date;
  const difference = new Date(Date.now()).getMinutes() - new Date(expirationDate).getMinutes();
  const efreshTokenExpTime = config.refreshTokenExpTime.split((/(d)/))[0];
  if (difference >= efreshTokenExpTime * 1440) {
    throw new Error('refresh token expiered');
  }
  if (
    tokensData && tokensData.refresh_token === refreshToken
  ) {
    const token = jwt.sign({ id: tokensData.user_id }, config.jwtSecret, { expiresIn: config.tokenExpTime });
    await updateUserRefreshTokenExp ({ userId: tokensData.user_id });
    return { token };
  } else {
    throw new Error('refresh token is not valid');
  }
};

const updateUserRefreshTokenExp = ({ userId }) => usersTokensDao
  .updateUserRefreshTokenExp({ userId });

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
  updateUserRefreshTokenExp,
};
