import { models } from '../models/index.js';

const { tasks: tasksModel } = models;

const getTasks = () => tasksModel.findAll({
  attributes: ['id', 'type', 'experience', 'name', 'description', 'owner_id', 'deadline_date', 'status', 'max_participants'],
});

const getTaskById = (id) => tasksModel.findAll({
  where: { id },
  attributes: ['id', 'type', 'experience', 'name', 'description', 'owner_id', 'deadline_date', 'status', 'max_participants'],
});

const createTask = (task) => tasksModel.create(task);

const updateTask = (id, task) => tasksModel.update(
  task,
  {
    where: { id },
    attributes: ['id', 'type', 'experience', 'name', 'description', 'owner_id', 'deadline_date', 'status', 'max_participants'],

  },
);

const deleteTask = (id) => tasksModel.destroy({
  where: { id },
  attributes: ['id', 'type', 'experience', 'name', 'description', 'owner_id', 'deadline_date', 'status', 'max_participants'],

});

export default {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
