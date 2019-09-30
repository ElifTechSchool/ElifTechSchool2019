import rankDao from '../dataAccess/rankDao.js';

const getRanks = () => rankDao.getRanks();

const getRankById = (id) => rankDao.getRankById(id);

const createRank = (rank) => rankDao.createRank(rank);

const updateRank = (id, rank) => rankDao.updateRank(id, rank);

const deleteRank = (id) => rankDao.deleteRank(id);

export default {
  getRanks,
  getRankById,
  createRank,
  updateRank,
  deleteRank,
};
