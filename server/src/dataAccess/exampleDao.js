import { models } from '../models/index.js';

const { examples: exampleModel } = models;

const getExamples = () => exampleModel.findAll();

const getExampleById = (id) => exampleModel.findByPk(id);

const createExample = (example) => exampleModel.create(example);

const updateExample = (id, example) => exampleModel.update(
  example,
  {
    where: { id },
  },
);

const deleteExample = (id) => exampleModel.destroy({
  where: { id },
});

export default {
  getExamples,
  getExampleById,
  createExample,
  updateExample,
  deleteExample,
};
