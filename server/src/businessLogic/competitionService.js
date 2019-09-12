import competitionDao from '../dataAccess/competitionDao.js';

const getCompetitions = () => competitionDao.getCompetitions();

const getCompetitionById = (id) => competitionDao.getCompetitionById(id);

const createCompetition = (competition) => competitionDao.createCompetition(competition);

const updateCompetition = (id, competition) => competitionDao.updateCompetition(id, competition);

const deleteCompetition = (id) => competitionDao.deleteCompetition(id);

export default {
  getCompetitions,
  getCompetitionById,
  createCompetition,
  updateCompetition,
  deleteCompetition,
};
