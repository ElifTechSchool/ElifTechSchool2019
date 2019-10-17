import { models } from '../models/index.js';

const { Sessions: sessions } = models;

const createSession = ({ refreshToken, userId, browserInfo }) => sessions
  .create({ user_id: userId, refresh_token: refreshToken, browser_info: browserInfo });

const getSessions = () => {
  return sessions.findAll({ raw: true });
};

const getSessionByUserId = (userId) => sessions.findOne({
  where: { user_id: userId },
});


const getSessionByUserIdAndBrowser = (userId, browserInfo) => sessions.findOne({
  where: { user_id: userId, browser_info: browserInfo },
});

const deleteOldSession = (id) => sessions.destroy({
  where: { id },
});

export default {
  createSession,
  getSessions,
  getSessionByUserId,
  deleteOldSession,
  getSessionByUserIdAndBrowser,
};
