<template>
  <form @submit.prevent="handleSubmit">
    <BaseSelect
      label="Select a category"
      optionPlaceholder="select one"
      v-model="event.category"
      :options="categories"
    />
    <h3>Name & describe your event</h3>
    <BaseInput
      class="field"
      label="Title"
      type="text"
      placeholder="Add an event title"
      v-model="event.title"
    />
    <BaseInput
      class="field"
      label="Description"
      type="text"
      placeholder="Add a description"
      v-model="event.description"
    />
    <h3>Where is your event?</h3>
    <BaseInput
      label="Location"
      type="text"
      class="field"
      placeholder="Add a location"
      v-model="event.location"
    />

    <h3>When is your event?</h3>
    <div class="field">
      <label>Date</label>
      <DatePicker v-model="event.date" placeholder="Select a date" />
    </div>
    <BaseSelect
      class="field"
      label="Select a time"
      v-model="event.time"
      :options="times"
    />
    <BaseButton type="submit" buttonClass="-fill-gradient">Submit</BaseButton>
  </form>
</template>

<script>
  import { mapState } from 'vuex';
  import DatePicker from 'vuejs-datepicker';
  import NProgress from 'nprogress';
  import BaseInput from '@/components/BaseInput';
  import BaseSelect from '@/components/BaseSelect';
  import BaseButton from '@/components/BaseButton';
  import { EVENTS_ACTIONS } from '../store/modules/events';

  export default {
    name: 'EventCreate',
    components: {
      DatePicker,
      BaseInput,
      BaseSelect,
      BaseButton
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
        NProgress.start();
        this.$store
          .dispatch(EVENTS_ACTIONS.CREATE_EVENT, this.event)
          .then(() => {
            this.$router.push({
              name: 'event-show',
              params: { id: this.event.id }
            });
            this.event = this.createFreshEvent();
          })
          .catch(() => {
            NProgress.done();
          });
      }
    },
    computed: {
      ...mapState(['categories'])
    }
  };
</script>

<style lang="scss" scoped>
  .field {
    margin-bottom: 24px;
  }
</style>
