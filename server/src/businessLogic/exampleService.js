import exampleDao from '../dataAccess/exampleDao.js';

const getExamples = () => exampleDao.getExamples();

const getExampleById = (id) => exampleDao.getExampleById(id);

const createExample = (example) => exampleDao.createExample(example);

const updateExample = (id, example) => exampleDao.updateExample(id, example);

const deleteExample = (id) => exampleDao.deleteExample(id);

export default {
  getExamples,
  getExampleById,
  createExample,
  updateExample,
  deleteExample,
};
