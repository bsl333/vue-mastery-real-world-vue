<template>
  <form @submit.prevent="handleSubmit">
    <label>Select a category</label>
    <select v-model="event.category">
      <option v-for="cat in categories" :key="cat">{{ cat }}</option>
    </select>
    <h3>Name & describe your event</h3>
    <div class="field">
      <label>Title</label>
      <input v-model="event.title" type="text" placeholder="Add an event title" />
    </div>
    <div class="field">
      <label>Description</label>
      <input v-model="event.description" type="text" placeholder="Add a description" />
    </div>
    <h3>Where is your event?</h3>
    <div class="field">
      <label>Location</label>
      <input v-model="event.location" type="text" placeholder="Add a location" />
    </div>
    <h3>When is your event?</h3>
    <div class="field">
      <label>Date</label>
      <DatePicker v-model="event.date" placeholder="Select a date" />
    </div>
    <div class="field">
      <label>Select a time</label>
      <select v-model="event.time">
        <option v-for="time in times" :key="time">{{ time }}</option>
      </select>
    </div>
    <input type="submit" class="button -fill-gradient" value="Submit" />
  </form>
</template>

<script>
  import { mapState } from 'vuex';
  import DatePicker from 'vuejs-datepicker';
  import { EVENTS_ACTIONS } from '../store/modules/events';
  export default {
    components: {
      DatePicker
    },
    data() {
      const times = [];
      for (let i = 1; i <= 24; i++) {
        times.push(i);
      }
      return {
        times,
        event: this.createFreshEvent()
      };
    },
    methods: {
      createFreshEvent() {
        const user = this.$store.state.user;
        const id = Math.floor(Math.random() * 10e6);
        return {
          id,
          category: '',
          organizer: user,
          title: '',
          description: '',
          location: '',
          date: '',
          time: '',
          attendees: []
        };
      },
      handleSubmit() {
        this.$store.dispatch(EVENTS_ACTIONS.CREATE_EVENT, this.event).then(() => {
          this.event = this.createFreshEvent();
        });
      }
    },
    computed: {
      ...mapState({ categories: 'categories' })
    }
  };
</script>

<style lang="scss" scoped>
  .field {
    margin-bottom: 24px;
  }
</style>
