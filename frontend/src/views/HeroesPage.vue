<template>
  <div class="heroes-page">
    <header>
      <h2>All Heroes</h2>
    </header>
    <section class="heroes-list">
      <HeroCard v-for="hero in heroes" :key="hero.id" :hero="hero" />
    </section>
  </div>
</template>

<script setup lang="ts">
// Import necessary components and APIs
import { ref, onMounted } from 'vue'
import type { Hero } from '../types/Hero'
import HeroCard from '../components/HeroCard.vue'

// Define the 'heroes' property using 'ref'
const heroes = ref<Hero[]>([])

const cdnAddress = 'https://cdn.cloudflare.steamstatic.com'

// type HeroRoles = 'Carry' | 'Support' | 'Nuker' | 'Initiator' | 'Durable' | 'Disabler' | 'Jungler' | 'Pusher'

// Fetch heroes data from an API when the component is mounted
const fetchHeroes = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/v1/heroes') // Replace with your actual API URL
    const data = await response.json()

    const primaryAttrImages: { [key: string]: string } = {
      str: `${cdnAddress}/apps/dota2/images/dota_react/icons/hero_strength.png`,
      agi: `${cdnAddress}/apps/dota2/images/dota_react/icons/hero_agility.png`,
      int: `${cdnAddress}/apps/dota2/images/dota_react/icons/hero_intelligence.png`,
      all: `${cdnAddress}/apps/dota2/images/dota_react/icons/hero_universal.png`,
    }

    // Map API response to match the structure needed for HeroCard
    heroes.value = data.map(
      (hero: Hero): Hero => ({
        id: hero.id,
        name: hero.name, // The internal name used for image URL and other purposes
        localized_name: hero.localized_name, // The localized name for display
        img: `${cdnAddress}/apps/dota2/images/heroes/${hero.name.replace('npc_dota_hero_', '')}_full.png`, // Path to the hero's image (assuming the image name is the internal 'name')
        primary_attr: primaryAttrImages[hero.primary_attr] || '', // Mapping primary_attr from API response
        attack_type: hero.attack_type, // Mapping attack_type from API response
        roles: hero.roles, // Mapping roles from API response
        legs: hero.legs, // Mapping legs from API response
      }),
    )
  } catch (error) {
    console.error('Error fetching heroes:', error)
  }
}

// Fetch heroes when the component is mounted
onMounted(() => {
  fetchHeroes()
})
</script>

<style scoped>
.heroes-page {
  text-align: center;
  padding: 2rem;
}

.heroes-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}
</style>
