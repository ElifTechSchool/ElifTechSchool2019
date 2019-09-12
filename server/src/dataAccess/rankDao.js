import { models } from '../models/index.js';

const { ranks: rankModel } = models;

const getRanks = () => rankModel.findAll();

const getRankById = (id) => rankModel.findAll({
  where: { id },
});

const createRank = (rank) => rankModel.create(rank);

const updateRank = (id, rank) => rankModel.update(
  rank,
  {
    where: { id },
  },
);

const deleteRank = (id) => rankModel.detroy({
  where: { id },
});

export default {
  getRanks,
  getRankById,
  createRank,
  updateRank,
  deleteRank,
};
