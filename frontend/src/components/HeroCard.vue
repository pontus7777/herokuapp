<template>
  <div class="hero-card">
    <img :src="hero.img" :alt="hero.localized_name" />
    <h3>{{ hero.localized_name }}</h3>
    <img :src="hero.primary_attr" :height="50" :width="50" />
    <p>{{ hero.roles }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Hero } from '../types/Hero'

// Define the 'hero' prop with the expected type
defineProps({
  hero: {
    type: Object as () => Hero, // Prop is typed as Hero
    required: true,
  },
})
</script>

<style scoped>
.hero-card {
  text-align: center;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
}

.hero-card img {
  width: 100px;
  height: 100px;
}

.hero-card h3 {
  font-size: 1.2rem;
  margin-top: 0.5rem;
}

/* Hero Cards Layout */
.hero-cards {
  display: flex;
  justify-content: space-between;
  gap: 30px;
  flex-wrap: wrap;
  padding: 0 20px;
}

.hero-card {
  background-color: var(--vt-c-black-soft);
  border-radius: 8px;
  overflow: hidden;
  width: 250px;
  transition:
    transform 0.3s ease,
    background-color 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.6);
  /* Adds depth to the cards */
}

.hero-card img {
  width: 100%;
  height: auto;
  border-bottom: 2px solid var(--vt-c-black-mute);
}

.hero-card p {
  padding: 10px;
  font-size: 1.1rem;
  background: var(--vt-c-black);
  color: var(--vt-c-text-light-1);
  font-weight: bold;
}

.hero-card:hover {
  background-color: var(--vt-c-black-mute);
  transform: scale(1.05);
}
</style>
