import { models } from '../models/index.js';

const { Sessions: sessions } = models;

const createSession = ({ refreshToken, userId }) => sessions.create({ user_id: userId, refresh_token: refreshToken });

const getSessions = () => {
  return sessions.findAll({ raw: true });
};

const getSessionByUserId = (userId) => sessions.findOne({
  where: { user_id: userId },
});
 
export default {
  createSession,
  getSessions,
  getSessionByUserId,
};
