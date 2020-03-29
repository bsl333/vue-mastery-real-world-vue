<template>
  <div>
    <h1>This is a the EventList view</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script>
  import EventCard from '../components/EventCard.vue';
  import EventService from '../services/EventService';
  export default {
    components: {
      EventCard
    },
    data() {
      return {
        events: []
      };
    },
    async created() {
      try {
        this.events = (await EventService.getEvents()).data;
      } catch (e) {
        console.error(e);
      }
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
</style>
