<template>
  <div class="player-profile">
    <img :src="player.avatarfull" alt="Avatar" class="avatar" />
    <div class="player-info">
      <h3>{{ player.personaname }}</h3>
      <p>Last Match: {{ formatLastMatchTime(player.last_match_time || '') }}</p>
      <p>Similarity: {{ player.similarity }}%</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PlayerSearchResult } from '../types/PlayerSearchResult'

// Define the player prop with the correct type
const player = defineProps<PlayerSearchResult>()

// Helper function to format the last match time
const formatLastMatchTime = (time: string) => {
  const date = new Date(time)
  return date.toLocaleString() // Formats the date to a readable string
}
</script>

<style scoped>
.player-profile {
  display: flex;
  margin-bottom: 16px;
  border: 1px solid #ddd;
  padding: 12px;
  border-radius: 8px;
  width: calc(33% - 16px);
  /* Adjust the width for 3 cards per row */
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 16px;
}

.player-info {
  flex: 1;
}

.player-info h3 {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
}

.player-info p {
  margin: 4px 0;
  color: #555;
}
</style>
