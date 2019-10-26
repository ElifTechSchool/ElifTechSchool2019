import eventsDao from '../dataAccess/eventsDao.js';

const getEvents = (query) => {
  const offset = (Number(query.page) - 1) * query.pageSize;
  return eventsDao.getEvents(offset, query.pageSize, query.search);
}

const getEventById = (id) => eventsDao.getEventById(id);

const createEvent = async (event) => {
  const eventData = event;
  const result = await eventsDao.createEvent(eventData);
  return result;
};

const updateEvent = (id, event) => eventsDao.updateEvent(id, event);

const deleteEvent = (id) => eventsDao.deleteEvent(id);

export default {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};