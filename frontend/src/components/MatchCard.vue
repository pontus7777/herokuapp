<template>
  <div class="match-card" v-for="match in matches" :key="match.id">
    <div class="match-header">
      <h3>Match ID: {{ match.id }}</h3>
      <span class="match-date">{{ match.date }}</span>
    </div>

    <div class="match-teams">
      <div class="team">
        <h4>Team 1</h4>
        <ul>
          <li v-for="player in match.team1.players" :key="player.id">
            {{ player.name }} - {{ player.hero }}
          </li>
        </ul>
      </div>

      <div class="team">
        <h4>Team 2</h4>
        <ul>
          <li v-for="player in match.team2.players" :key="player.id">
            {{ player.name }} - {{ player.hero }}
          </li>
        </ul>
      </div>
    </div>

    <div class="match-result">
      <p v-if="match.result === 'win'">Team 1 Wins!</p>
      <p v-if="match.result === 'loss'">Team 2 Wins!</p>
      <p v-if="match.result === 'draw'">Draw!</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMatchStore } from '../stores/dotaStore'
import { onMounted } from 'vue'

const matchStore = useMatchStore()

// Fetch match data when the component mounts
onMounted(async () => {
  await matchStore.fetchMatches()
})

// Access the match data from the store
const matches = matchStore.matches
</script>

<style scoped>
/* Same styles as before */
.match-card {
  background-color: #2b2b2b;
  border: 1px solid #606060;
  border-radius: 8px;
  padding: 16px;
  color: #e0e0e0;
  max-width: 400px;
  margin: 10px;
}

.match-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.match-teams {
  display: flex;
  justify-content: space-between;
}

.team {
  width: 45%;
}

.team h4 {
  font-size: 1.1rem;
  margin-bottom: 10px;
}

.match-result {
  margin-top: 20px;
  text-align: center;
}

.match-result p {
  font-weight: bold;
  font-size: 1.2rem;
}

.match-date {
  font-size: 0.9rem;
  color: #a9a9a9;
}
</style>
