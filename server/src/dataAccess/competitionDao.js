import { models } from '../models/index.js';

const { competitions: competitionModel } = models;

const getCompetitions = () => competitionModel.findAll({
  attributes: ['id', 'name', 'description', 'deadline_date', 'experience' ]
});

const getCompetitionById = (id) => competitionModel.findByPk(id);

const createCompetition = (competition) => competitionModel.create(competition);

const updateCompetition = (id, competition) => competitionModel.update(
  competition,
  {
    where: { id },
    attributes: ['id', 'name', 'description', 'deadline_date', 'experience' ]
  },
);

const deleteCompetition = (id) => competitionModel.destroy({
  where: { id },
  attributes: ['id', 'name', 'description', 'deadline_date', 'experience' ]
});

export default {
  getCompetitions,
  getCompetitionById,
  createCompetition,
  updateCompetition,
  deleteCompetition,
};
