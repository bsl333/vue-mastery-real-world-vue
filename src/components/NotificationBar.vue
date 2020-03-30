<template>
  <div class="notification-bar" :class="notificationTypeClass">
    <p>
      {{ notification.message }}
    </p>
  </div>
</template>

<script>
  import { NOTIFICATIONS_ACTIONS } from '../store/modules/notifications';
  export default {
    props: {
      notification: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        timer: null,
      };
    },
    computed: {
      notificationTypeClass() {
        return `-text-${this.notification.type}`;
      },
    },
    mounted() {
      this.timer = setTimeout(
        () => this.$store.dispatch(NOTIFICATIONS_ACTIONS.REMOVE, this.notification),
        2000
      );
    },
  };
</script>

<style scoped>
  .notification-bar {
    margin: 1em 0 1em;
  }
</style>
