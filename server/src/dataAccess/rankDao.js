import { models } from '../models/index.js';

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

const deleteRank = (id) => rankModel.destroy({
  where: { id },
});

export default {
  getRanks,
  getRankById,
  createRank,
  updateRank,
  deleteRank,
};
