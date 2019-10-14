import rankDao from '../dataAccess/rankDao.js';

const getRanks = () => rankDao.getRanks();

const getRankById = (id) => rankDao.getRankById(id);

const createRank = async (rank) => {
  const localRank = rank;
  const previousRank = await rankDao.getOneRank(rank.experience);
  if (previousRank == null) {
    localRank.number = 1;
  } else {
    localRank.number = previousRank.number + 1;
  }
  await rankDao.updateNum(rank.experience);
  const result = await rankDao.createRank(localRank);
  return result;
};

const updateRank = (id, rank) => rankDao.updateRank(id, rank);

const deleteRank = (id) => rankDao.deleteRank(id);

export default {
  getRanks,
  getRankById,
  createRank,
  updateRank,
  deleteRank,
};
