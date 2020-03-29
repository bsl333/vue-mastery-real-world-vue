import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';
import events from './modules/events';
import notifications from './modules/notifications';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ]
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    events,
    notifications
  }
});
