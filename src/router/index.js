import Vue from 'vue';
import VueRouter from 'vue-router';
import EventCreate from '../views/EventCreate.vue';
import EventList from '../views/EventList.vue';
import EventShow from '../views/EventShow.vue';
import NotFound from '../views/NotFound.vue';
import NetworkIssue from '../views/NetworkIssue';
import NProgress from 'nprogress';
import store from '../store';
import { EVENTS_ACTIONS } from '../store/modules/events';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'event-list',
    component: EventList,
    props: true
  },
  {
    path: '/event/create',
    name: 'event-create',
    component: EventCreate
  },
  {
    path: '/event/:id',
    name: 'event-show',
    component: EventShow,
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      store
        .dispatch(EVENTS_ACTIONS.FETCH_EVENT, routeTo.params.id)
        .then(event => {
          routeTo.params.event = event;
          next();
        })
        .catch(error => {
          if (error.response && error.response.status === 404) {
            next({ name: 'not-found', params: { resource: 'event' } });
          } else {
            next({ name: 'network-issue' });
          }
        });
    }
  },
  {
    path: '/not-found',
    name: 'not-found',
    component: NotFound,
    props: true
  },
  {
    path: '/network-issue',
    name: 'network-issue',
    component: NetworkIssue
  },
  {
    path: '*',
    redirect: { name: 'not-found', params: { resource: 'page' } }
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
