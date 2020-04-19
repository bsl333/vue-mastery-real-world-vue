<template>
  <form @submit.prevent="handleSubmit">
    <BaseSelect
      label="Select a category"
      optionPlaceholder="select one"
      v-model="event.category"
      :options="categories"
      :class="{ error: $v.event.category.$error }"
      @blur="$v.event.category.$touch()"
    />
    <template v-if="$v.event.category.$error">
      <p v-if="!$v.event.category.required" class="errorMessage">
        Category is required.
      </p>
    </template>

    <h3>Name & describe your event</h3>
    <BaseInput
      class="field"
      label="Title"
      type="text"
      placeholder="Add an event title"
      v-model="event.title"
      @blur="$v.event.title.$touch()"
    />
    <template v-if="$v.event.title.$error">
      <p v-if="!$v.event.title.required" class="errorMessage">
        Title is required.
      </p>
    </template>
    <BaseInput
      class="field"
      label="Description"
      type="text"
      placeholder="Add a description"
      v-model="event.description"
      @blur="$v.event.description.$touch()"
    />
    <template v-if="$v.event.description.$error">
      <p v-if="!$v.event.description.required" class="errorMessage">
        Description is required.
      </p>
    </template>

    <h3>Where is your event?</h3>
    <BaseInput
      label="Location"
      type="text"
      class="field"
      placeholder="Add a location"
      v-model="event.location"
      @blur="$v.event.location.$touch()"
    />
    <template v-if="$v.event.location.$error">
      <p v-if="!$v.event.location.required" class="errorMessage">
        Location is required.
      </p>
    </template>

    <h3>When is your event?</h3>
    <div class="field">
      <label>Date</label>
      <DatePicker
        v-model="event.date"
        placeholder="Select a date"
        @closed="$v.event.date.$touch()"
      />
    </div>
    <template v-if="$v.event.date.$error">
      <p v-if="!$v.event.date.required" class="errorMessage">
        Date is required.
      </p>
    </template>

    <BaseSelect
      class="field"
      label="Select a time"
      v-model="event.time"
      :options="times"
      :class="{ error: $v.event.time.$error }"
      @blur="$v.event.time.$touch()"
    />

    <template v-if="$v.event.time.$error">
      <p v-if="!$v.event.time.required" class="errorMessage">
        Time is required.
      </p>
    </template>
    <BaseButton
      type="submit"
      buttonClass="-fill-gradient"
      :disabled="$v.anyError"
      >Submit</BaseButton
    >
    <p v-if="$v.anyError">Please fill out required field(s)</p>
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
  import { required } from 'vuelidate/lib/validators';

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
    validations: {
      event: {
        category: {
          required
        },
        title: {
          required
        },
        description: {
          required
        },
        location: {
          required
        },
        date: {
          required
        },
        time: {
          required
        }
      }
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
        this.$v.$touch();
        if (this.$v.$invalid) {
          return;
        }
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
