import EventService from '../../services/EventService';
import { NOTIFICATIONS_ACTIONS } from './notifications';

export default {
  namespaced: true,
  state: {
    events: [],
    totalEvents: 0,
    currentEvent: {},
    perPage: 3
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
      dispatch(NOTIFICATIONS_ACTIONS.ADD, notification, { root: true });
      return;
    },
    async fetchEvents({ commit, dispatch, state }, { page }) {
      try {
        const { data, headers } = await EventService.getEvents(
          state.perPage,
          page
        );
        commit('SET_EVENTS', data);
        commit('TOTAL_EVENTS', headers['x-total-count']);
        return data;
      } catch (error) {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching the events: ' + error.message
        };
        dispatch(NOTIFICATIONS_ACTIONS.ADD, notification, { root: true });
      }
    },
    async fetchEvent({ commit, getters, dispatch }, id) {
      try {
        const event = getters.getEventById(id)
          ? getters.getEventById(id)
          : (await EventService.getEvent(id)).data;
        commit('SET_EVENT', event);
        return event;
      } catch (error) {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching the event: ' + error.message
        };
        dispatch(NOTIFICATIONS_ACTIONS.ADD, notification, { root: true });
        throw error;
      }
    }
  }
};
const EVENTS = 'events/';
export const EVENTS_ACTIONS = {
  FETCH_EVENTS: EVENTS + 'fetchEvents',
  FETCH_EVENT: EVENTS + 'fetchEvent',
  CREATE_EVENT: EVENTS + 'createEvent'
};
