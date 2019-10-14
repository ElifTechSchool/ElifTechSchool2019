import rankDao from '../dataAccess/rankDao.js';

const getRanks = (query) => {
  const offset = (Number(query.page) - 1) * query.pageSize;
  return rankDao.getRanks(offset, query.pageSize, query.search);
};

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

const updateRank = async (id, rank) => {
  await rankDao.updateNum(rank.experience, 'number + 1');
  const result = await rankDao.updateRank(id, rank);
  return result;
};

const deleteRank = async (id) => {
  const localRank = await rankDao.getRankById(id);
  await rankDao.updateNum(localRank.experience, 'number - 1');
  const result = await rankDao.deleteRank(id);
  return result;
};


export default {
  getRanks,
  getRankById,
  createRank,
  updateRank,
  deleteRank,
};
