<template>
  <div>
    <h1>Oops!</h1>
    <h4>The {{ resource }} was not found</h4>
    <router-link :to="{ name: 'event-list' }">Home page</router-link>
  </div>
</template>

<script>
  export default {
    props: {
      resource: {
        type: String,
        default: 'page'
      }
    }
  };
</script>
