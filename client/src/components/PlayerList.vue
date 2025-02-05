<template>
  <ul class="player-list">
    <li v-for="player in players" :key="player.account_id">
      <img :src="player.avatarfull" alt="Player Avatar" />
      <p>{{ player.personaname }}</p>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { PlayerSearchResult } from '../types/PlayerSearchResult'

defineProps<{
  players: PlayerSearchResult[]
}>()
</script>

<style scoped>
img {
  size: 50px;
}

.player-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  max-width: 100%; /* Prevents the list from expanding too wide */
  justify-content: center; /* Centers the list */
}
</style>
