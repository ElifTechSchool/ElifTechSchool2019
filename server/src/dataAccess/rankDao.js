import sequelize, { models, Op } from '../models/index.js';

const { ranks: rankModel } = models;

const getRanks = () => rankModel.findAll({
  order: [
    ['number', 'ASC'],
  ],
});

const getRankById = (id) => rankModel.findByPk(id);

const createRank = (rank) => rankModel.create(rank);

const updateRank = (id, rank) => rankModel.update(
  rank,
  {
    where: { id },
  },
);

const updateNum = async (exp) => rankModel.update({ number: sequelize.literal('number + 1') }, {
  where: {
    experience: { [Op.gt]: exp },
  },
});

// find one Rank where experience < argument exp
const getOneRank = (exp) => rankModel.findOne({
  attributes: ['number', 'experience'],
  where: {
    experience: { [Op.lt]: exp },
  },
  order: [
    ['number', 'DESC'],
  ],
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
  getOneRank,
};
