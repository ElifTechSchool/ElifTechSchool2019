import cloudinary from 'cloudinary';
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
  newRank.number = oldRank.number;
  await cloudinary.v2.uploader.destroy(oldRank.photo_id);
  const result = await rankDao.updateRank(id, newRank);
  if (oldRank.experience !== newRank.experience) {
    const sortedRanks = await rankDao.getSortedByExpRanks();
    const ranksToUpdate = sortedRanks.map((el, index) => ({
      id: el.id,
      number: index + 1,
    }));
    await Promise.all(
      ranksToUpdate.map((rankItem) => rankDao.updateRank(rankItem.id, rankItem)),
    );
  }
  return result;
};

const deleteRank = async (id) => {
  const oldRank = await rankDao.getRankById(id);
  await cloudinary.v2.uploader.destroy(oldRank.photo_id);
  await rankDao.updateNum(oldRank.experience, 'number - 1');
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
