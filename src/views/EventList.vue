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
        v-if="page * perPage < totalEvents"
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
  export default {
    components: {
      EventCard
    },
    data() {
      return {
        perPage: 3
      };
    },
    computed: {
      ...mapState({
        events: state => state.events.events,
        totalEvents: state => state.events.totalEvents,
        user: 'user'
      }),
      page() {
        return parseInt(this.$route.query.page) || 1;
      }
    },
    async created() {
      const { perPage, page } = this;
      this.$store.dispatch(EVENTS_ACTIONS.FETCH_EVENTS, {
        perPage,
        page
      });
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
