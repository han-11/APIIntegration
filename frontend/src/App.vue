<template>
  <div class="app-container">
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  name: 'App',
  components: {
    NavBar,
  },
};
</script>

<style scoped>
.app-container {
  padding: 20px;
  max-width: 1000px; /* Updated the width for a more spacious layout */
  margin: 0 auto;
}

@media (min-width: 640px) {
  .app-container {
    padding: 40px; /* Increase padding on larger screens */
  }
}
</style>
