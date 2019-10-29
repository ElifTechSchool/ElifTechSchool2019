import axios from "axios";

const state = {
  events: [],
  isEmpty: false,
  eventsPageSize: 4,
  countOfPages: 0,
  eventsQty: 0,
  searchEvent: "",
};

const getters = {
  allEvents: state => state.events,
  eventIsEmpty: state => state.isEmpty,
  eventsPageSize: state => state.eventsPageSize,
  countOfPages: state => state.countOfPages,
  eventsQty: state => state.eventsQty,
  searchEvent: state => state.searchEvent,
  eventById: id => state.events.find(el => el.id === id),
};

const mutations = {
  setEvents: (state, events) => {
    state.events = events;
  },
  setEvent: (state, event) => {
    state.eventById = event;
  },
  addEvent: (state, events) => {
    state.events.push(events);
  },
  setPageSize: (state, events) => {
    state.eventsPageSize = events;
  },
  setCountOfPages: state => {
    state.countOfPages = Math.ceil(state.eventsQty / state.eventsPageSize);
  },
  setSearch: (state, events) => {
    state.searchEvent = events;
  },
  setEventsQty: (state, events) => {
    state.eventsQty = events;
  }
};

const actions = {
  async getAllEvents({ commit, dispatch }, query) {
    try {
      commit("setPageSize", query.pageSize);
      commit("setSearch", query.search);
      const response = await axios.get("events", { params: { ...query } });
      commit("setEvents", response.data.rows);
      commit("setEventsQty", response.data.count);
      commit("setCountOfPages");
      if (state.events.length === 0) {
        state.isEmpty = true;
      }
    } catch (error) {
      const message = error.message;
      dispatch("showSnackBar", { message, color: "red" });
    }
  },
  async getEventById(store, id) {
    try {
      return await axios.get(`events/${id}`);
    } catch (error) {
      console.log(error);
    }
  },
  async addEvent({ commit, dispatch }, event) {
    try {
      const response = await axios.post("events", event, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      commit("addEvent", response.data);
      dispatch("showSnackBar", {
        message: "Event added succesfully",
        color: "green"
      });
    } catch (error) {
      const message = error.message;
      dispatch("showSnackBar", { message, color: "red" });
    }
  },
  async updateEvent({ dispatch }, event) {
    try {
      console.log(event);
      await axios.put(`events/${event.id}`, event.data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      dispatch("getAllEvents");
    } catch (error) {
      const message = error.message;
      dispatch("showSnackBar", { message, color: "red" });
    }
  },
  async deleteEvent({ dispatch }, id) {
    try {
      await axios.delete(`events/${id}`);
      dispatch("getAllEvents");
    } catch (error) {
      const message = error.message;
      dispatch("showSnackBar", { message, color: "red" });
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
