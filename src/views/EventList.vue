<template>
  <div>
    <h1>Events for {{ user.name }}</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <div class="links">
      <router-link
        v-if="page !== 1"
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
      >
        Prev page
      </router-link>
      <router-link
        v-if="hasNextPage"
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
      >
        Next page
      </router-link>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import EventCard from '../components/EventCard.vue';
  import { EVENTS_ACTIONS } from '../store/modules/events';
  import store from '../store';

  async function getPageEvents(routeTo, next) {
    const page = parseInt(routeTo.query.page) || 1;
    await store.dispatch(EVENTS_ACTIONS.FETCH_EVENTS, {
      page
    });
    routeTo.params.page = page;
    next();
  }
  export default {
    props: {
      page: {
        type: Number,
        required: true
      }
    },
    components: {
      EventCard
    },
    computed: {
      hasNextPage() {
        return this.page * this.perPage < this.totalEvents;
      },
      ...mapState('events', ['events', 'totalEvents', 'perPage']),
      ...mapState(['user'])
      // ...mapState({
      //   events: state => state.events.events,
      //   totalEvents: state => state.events.totalEvents,
      //   perPage: state => state.events.perPage,
      //   user: state => state.user
      // })
    },
    beforeRouteEnter(routeTo, routeFrom, next) {
      getPageEvents(routeTo, next);
    },
    beforeRouteUpdate(routeTo, routeFrom, next) {
      getPageEvents(routeTo, next);
    }
  };
</script>

<style lang="scss" scoped>
  li {
    cursor: pointer;

    &:hover {
      color: #42b983;
      text-decoration: underline;
    }
  }
  .links {
    display: flex;
    justify-content: space-between;
  }
</style>
