import { models } from '../models/index.js';
import  Sequelize from 'sequelize'
const Op = Sequelize.Op;
const { competitions: competitionModel} = models;
const { users_competitions: competitionFollowersModel } = models;
const { users: usersModel } = models;


const getCompetitions = (params) => competitionModel.findAndCountAll({
   
    limit: params.limit,
    offset: params.offset,
    include: [{
      model: usersModel,
      through: competitionFollowersModel,
      attributes: ['id', 'surname', 'name', 'image_url'],
    }],
    distinct: true,
    attributes: ['id', 'name', 'description', 'deadline_date', 'experience'],
    
  });

  const getActiveCompetitions = (params) => competitionModel.findAndCountAll({
   
    limit: params.limit,
    offset: params.offset,
    include: [{
      model: usersModel,
      through: competitionFollowersModel,
      attributes: ['id', 'surname', 'name', 'image_url'],
    }],
    distinct: true,
    attributes: ['id', 'name', 'description', 'deadline_date', 'experience'],
    where: {'deadline_date': {[Op.gt]: new Date(Date.now())}  },
  });

  const getPastCompetitions = (params) => competitionModel.findAndCountAll({
   
    limit: params.limit,
    offset: params.offset,
    include: [{
      model: usersModel,
      through: competitionFollowersModel,
      attributes: ['id', 'surname', 'name', 'image_url'],
    }],
    distinct: true,
    attributes: ['id', 'name', 'description', 'deadline_date', 'experience'],
    where: {'deadline_date': {[Op.lt]: new Date(Date.now())}  },
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
