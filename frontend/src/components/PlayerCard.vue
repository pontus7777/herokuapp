<template>
  <div class="player-card" v-if="player">
    <img :src="player.profile.avatar" alt="Player Avatar" />
    <h3>{{ player.profile.personaname }}</h3>
    <p>MMR: {{ player.mmr_estimate.estimate }}</p>
  </div>
  <div v-else>
    <p>Player data is unavailable.</p>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

// Define types for player data
interface PlayerProfile {
  avatar: string
  personaname: string
}

interface MMR {
  estimate: number
}

interface Player {
  profile: PlayerProfile
  mmr_estimate: MMR
}

// Directly define the prop without using the "props" variable
defineProps({
  player: {
    type: Object as PropType<Player | null | undefined>,
    required: true,
  },
})
</script>

<style scoped>
.player-card {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 5px;
}
</style>
