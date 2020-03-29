import EventService from '../../services/EventService';

export default {
  state: {
    events: [],
    totalEvents: 0,
    currentEvent: {}
  },
  getters: {
    getEventById: state => id => state.events.find(event => event.id === id)
  },
  mutations: {
    SET_EVENTS(state, events) {
      state.events = [...events];
    },
    SET_EVENT(state, event) {
      state.currentEvent = event;
    },
    ADD_EVENT(state, event) {
      state.events.push(event);
    },
    TOTAL_EVENTS(state, totalEvents) {
      state.totalEvents = totalEvents;
    }
  },
  actions: {
    async createEvent({ commit, dispatch }, event) {
      let notification;
      try {
        await EventService.createEvent(event);
        commit('ADD_EVENT', event);
        notification = {
          type: 'success',
          message: `event ${event.id} was added`
        };
      } catch (error) {
        notification = {
          type: 'error',
          message: 'There was a problem creating your event: ' + error.message
        };
      }
      dispatch('add', notification);
      return;
    },
    async fetchEvents({ commit, dispatch }, { perPage, page }) {
      try {
        const resp = await EventService.getEvents(perPage, page);
        commit('SET_EVENTS', resp.data);
        commit('TOTAL_EVENTS', resp.headers['x-total-count']);
      } catch (error) {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching the events: ' + error.message
        };
        dispatch('add', notification);
      }
    },
    async fetchEvent({ commit, getters, dispatch }, id) {
      try {
        const event = getters.getEventById(id)
          ? getters.getEventById(id)
          : (await EventService.getEvent(id)).data;
        commit('SET_EVENT', event);
      } catch (error) {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching the event: ' + error.message
        };
        dispatch('add', notification);
      }
    }
  }
};
