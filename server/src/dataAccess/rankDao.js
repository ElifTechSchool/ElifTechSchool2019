import sequelize, { models, Op } from '../models/index.js';

const { ranks: rankModel } = models;

const getRanks = (offset, limit, search) => rankModel.findAndCountAll({
  ...search ? {
    where: {
      name: { [Op.iLike]: `%${search}%` },
    },
  } : {},
  offset,
  limit,
  order: [
    ['number', 'ASC'],
  ],
  attributes: ['id', 'name', 'experience', 'number', 'photo_url', 'photo_id'],
});

const getRankById = (id) => rankModel.findByPk(id);

const createRank = (rank) => rankModel.create(rank);

const updateRank = (id, rank) => rankModel.update(
  rank,
  {
    where: { id },
  },
);

const updateNum = (exp, query) => rankModel.update({ number: sequelize.literal(query) }, {
  where: {
    experience: { [Op.gt]: exp },
  },
});

// find one Rank where experience < exp
const getPreviousRank = (exp) => rankModel.findOne({
  attributes: ['number', 'experience'],
  where: {
    experience: { [Op.lt]: exp },
  },
  order: [
    ['number', 'DESC'],
  ],
});

// find one Rank where experience > exp
const getNextRank = (exp) => rankModel.findOne({
  attributes: ['number', 'experience'],
  where: {
    experience: { [Op.gt]: exp },
  },
  order: [
    ['number', 'DESC'],
  ],
});

const getSortedByExpRanks = () => rankModel.findAll({
  order: [
    ['experience', 'ASC'],
  ],
  attributes: ['id', 'name', 'experience', 'number', 'photo_url', 'photo_id'],
});

const deleteRank = (id) => rankModel.destroy({
  where: { id },
});

export default {
  getRanks,
  getRankById,
  createRank,
  updateRank,
  deleteRank,
  updateNum,
  getPreviousRank,
  getNextRank,
  getSortedByExpRanks,
};
