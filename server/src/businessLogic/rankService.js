import rankDao from '../dataAccess/rankDao.js';

const getRanks = (query) => {
  const offset = (Number(query.page) - 1) * query.pageSize;
  return rankDao.getRanks(offset, query.pageSize, query.search);
};

const getRankById = (id) => rankDao.getRankById(id);

const createRank = async (rank) => {
  const localRank = rank;
  const previousRank = await rankDao.getPreviousRank(localRank.experience);
  localRank.number = previousRank == null ? 1 : previousRank.number + 1;
  await rankDao.updateNum(rank.experience, 'number + 1');
  const result = await rankDao.createRank(localRank);
  return result;
};

const updateRank = async (id, rank) => {
  const newRank = rank;
  const oldRank = await rankDao.getRankById(id);
  const previuosOldRank = await rankDao.getPreviousRank(oldRank.experience);
  const nextOldRank = await rankDao.getNextRank(oldRank.experience);
  if (oldRank.experience !== newRank.experience) {
    const previousRank = await rankDao.getPreviousRank(newRank.experience);
    newRank.number = previousRank == null ? 1 : previousRank.number;
  }
  if (newRank.experience > nextOldRank.experience) {
    await rankDao.updateNextRanks(oldRank.number, newRank.experience, 'number - 1');
  }
  if (newRank.experience < previuosOldRank.experience) {
    await rankDao.updateNextRanks(oldRank.number, newRank.experience, 'number + 1');
  }
  const result = await rankDao.updateRank(id, newRank);
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
