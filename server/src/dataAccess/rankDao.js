import sequelize, { models, Op } from '../models/index.js';

const { ranks: rankModel } = models;

const getRanks = (offset, limit, search) => {
  if (search) {
    return rankModel.findAndCountAll({
      where: {
        name: { [Op.iLike]: `%${search}%` },
      },
      offset,
      limit,
      order: [
        ['number', 'ASC'],
      ],
      attributes: ['id', 'name', 'experience', 'number', 'photo_url', 'photo_id'],
    });
  }
  return rankModel.findAndCountAll({
    offset,
    limit,
    order: [
      ['number', 'ASC'],
    ],
    attributes: ['id', 'name', 'experience', 'number', 'photo_url', 'photo_id'],
  });
};

const getRankById = (id) => rankModel.findByPk(id);

const createRank = (rank) => rankModel.create(rank);

const updateRank = (id, rank) => rankModel.update(
  rank,
  {
    where: { id },
  },
);

const updateNum = async (exp, query) => rankModel.update({ number: sequelize.literal(query) }, {
  where: {
    experience: { [Op.gt]: exp },
  },
});

// find one Rank where experience < exp
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
