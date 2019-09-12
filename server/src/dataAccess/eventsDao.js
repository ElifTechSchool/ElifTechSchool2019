import { models } from '../models/index.js';

const { events: eventsModel } = models;

const getEvents = () => eventsModel.findAll({
  attributes: ['id', 'title', 'description', 'location', 'max_people', 'image', 'date', 'time'],
});

const getEventById = (id) => eventsModel.findAll({
  where: { id },
  attributes: ['id', 'title', 'description', 'location', 'max_people', 'image', 'date', 'time'],
});

const createEvent = (event) => eventsModel.create(event);

const updateEvent = (id, event) => eventsModel.update(
  event,
  {
    where: { id },
    attributes: ['id', 'title', 'description', 'location', 'max_people', 'image', 'date', 'time'],
  },
);

const deleteEvent = (id) => eventsModel.destroy({
  where: { id },
  attributes: ['id', 'title', 'description', 'location', 'max_people', 'image', 'date', 'time'],
});

export default {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
