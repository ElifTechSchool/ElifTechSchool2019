import sequelize, { models, Op } from '../models/index.js';

const { events: eventsModel } = models;

const getEvents = (offset, limit, search) => eventsModel.findAndCountAll({
  ...search ? {
    where: {
      title: { [Op.iLike]: `%${search}%` },
    },
  } : {},
  offset,
  limit,
  order: [
    ['id', 'DESC'],
  ],
  attributes: ['id', 'title', 'description', 'location', 'max_people', 'image_url', 'date'],
});

const getEventById = (id) => eventsModel.findAll({
  where: { id },
  attributes: ['id', 'title', 'description', 'location', 'max_people', 'image_url', 'date'],
});

const createEvent = (event) => eventsModel.create(event);

const updateEvent = (id, event) => eventsModel.update(
  event,
  {
    where: { id },
    attributes: ['id', 'title', 'description', 'location', 'max_people', 'image_url', 'date'],
  },
);

const deleteEvent = (id) => eventsModel.destroy({
  where: { id },
  attributes: ['id', 'title', 'description', 'location', 'max_people', 'image_url', 'date'],
});

export default {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};