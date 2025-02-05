<template>
  <div class="home-page">
    <h1>{{ message }}</h1>
    <p>Check out stats, heroes, items, and more.</p>
  </div>
</template>

<script setup lang="ts">
// No need for `export default` here
import { ref } from 'vue'

const message = ref('Welcome to Dota 2 Stats!')
</script>

<style scoped>
.home-page {
  text-align: center;
  padding: 2rem;
}

.home-page h1 {
  font-size: 2rem;
  color: #f4a261;
  /* Dota 2 Gold color */
}

.home-page p {
  color: #fff;
  font-size: 1.2rem;
}
</style>
