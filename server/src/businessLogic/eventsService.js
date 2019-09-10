import eventsDao from '../dataAccess/eventsDao.js';

const getEvents = () => eventsDao.getEvents();

const getEventById = (id) => eventsDao.getEventById(id);

const createEvent = (event) => eventsDao.createEvent(event);

const updateEvent = (id, event) => eventsDao.updateEvent(id, event);

const deleteEvent = (id) => eventsDao.deleteEvent(id);

export default {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};