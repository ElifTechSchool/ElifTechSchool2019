import { models } from '../models/index.js';

const { competitions: competitionModel} = models;
const { users_competitions: competitionFollowersModel } = models;
const { users: usersModel } = models;


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
    where: {competitionId: competitionId},
    include: [usersModel, competitionModel]
  
  });


const createCompetitionFollower = (competitionId, competitionFollower) => competitionFollowersModel.create({userId: competitionFollower.userId, competitionId: competitionId});


const deleteCompetitionFollower = (id, followerId) => competitionFollowersModel.destroy({
  where: { competitionId: id, userId: followerId},
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