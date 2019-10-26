import competitionDao from '../dataAccess/competitionDao.js';

const getCompetitions = (params) => competitionDao.getCompetitions(params);

const getActiveCompetitions = (params) => competitionDao.getActiveCompetitions(params);

const getPastCompetitions = (params) => competitionDao.getPastCompetitions(params);

const getCompetitionById = (id) => competitionDao.getCompetitionById(id);

const createCompetition = (competition) => competitionDao.createCompetition(competition);

const updateCompetition = (id, competition) => competitionDao.updateCompetition(id, competition);

const deleteCompetition = (id) => competitionDao.deleteCompetition(id);


const getCompetitionFollowers = (competitionId) => competitionDao.getCompetitionFollowers(competitionId);

const createCompetitionFollower = (competitionId, competitionFollower) => competitionDao.createCompetitionFollower(competitionId, competitionFollower);

const deleteCompetitionFollower = (id, followerId) => competitionDao.deleteCompetitionFollower(id, followerId);


export default {
  getCompetitions,
  getActiveCompetitions,
  getPastCompetitions,
  getCompetitionById,
  createCompetition,
  updateCompetition,
  deleteCompetition,
  getCompetitionFollowers,
  createCompetitionFollower,
  deleteCompetitionFollower,
};
