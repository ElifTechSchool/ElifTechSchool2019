import { models } from '../models/index.js';

const { competitions: competitionModel } = models;
const { users_competitions: competitionFollowersModel } = models;


const getCompetitions = (params) => competitionModel.findAndCountAll({
    limit: params.limit,
    offset: (params.page-1)*params.limit,
    attributes: ['id', 'name', 'description', 'deadline_date', 'experience'],
  });

const getCompetitionById = (id) => competitionModel.findByPk(id, {
  attributes: ['id', 'name', 'description', 'deadline_date', 'experience'],
    }
  );

const createCompetition = (competition) => competitionModel.create(competition);

const updateCompetition = (id, competition) => competitionModel.update(
  competition,
  {
    where: { id },
    attributes: ['id', 'name', 'description', 'deadline_date', 'experience'],

  },
);

const deleteCompetition = (id) => competitionModel.destroy({
  where: { id },
});


const getCompetitionFollowers = (competitionId) => competitionFollowersModel.findAll({
  where: { competition_id: competitionId },
  attributes: ['id', 'user_id', 'competition_id'],
});


const createCompetitionFollower = (competitionId, competitionFollower) => competitionFollowersModel.create({ user_id: competitionFollower.user_id, competition_id: competitionId });


const deleteCompetitionFollower = (id, followerId) => competitionFollowersModel.destroy({
  where: { competition_id: id, user_id: followerId },
});

export default {
  getCompetitions,
  getCompetitionById,
  createCompetition,
  updateCompetition,
  deleteCompetition,
  getCompetitionFollowers,
  createCompetitionFollower,
  deleteCompetitionFollower,
};
