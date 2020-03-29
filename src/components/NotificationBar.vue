<template>
  <div class="notification-bar" :class="notificationTypeClass">
    <p>
      {{ notification.message }}
    </p>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  export default {
    props: {
      notification: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        timer: null
      };
    },
    methods: {
      ...mapActions('notifications', ['remove'])
    },
    computed: {
      notificationTypeClass() {
        return `-text-${this.notification.type}`;
      }
    },
    mounted() {
      this.timer = setTimeout(() => this.remove(this.notification), 2000);
    }
  };
</script>

<style scoped>
  .notification-bar {
    margin: 1em 0 1em;
  }
</style>
