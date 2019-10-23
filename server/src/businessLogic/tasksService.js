import tasksDao from '../dataAccess/tasksDao.js';

const getTasks = () => tasksDao.getTasks();

const getTaskById = (id) => taskDao.getTaskById(id);

const createTask = (task) => tasksDao.createTask(task);

const updateTask = (id, task) => tasksDao.updateTask(id, task);

const deleteTask = (id) => tasksDao.deleteTask(id);

export default {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
