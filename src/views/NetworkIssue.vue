<template>
  <div>
    <h1>Uh-oh!</h1>
    <h4>
      It looks like you're having network issues, click the back button and try
      again.
    </h4>
    <router-link :to="{ name: 'event-list' }">
      Or, go to the home page
    </router-link>
  </div>
</template>
