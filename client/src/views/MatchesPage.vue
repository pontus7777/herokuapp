<template>
  <div class="matches-page">
    <header>
      <h2>Recent Matches</h2>
    </header>
    <section class="matches-list">
      <MatchCard v-for="match in matches" :key="match.id" :match="match" />
    </section>
  </div>
</template>

<script lang="ts">
import MatchCard from '../components/MatchCard.vue'

export default {
  name: 'MatchesPage',
  components: {
    MatchCard,
  },
  data() {
    return {
      matches: [
        { id: 1, date: '2024-12-01', winner: 'Radiant', duration: '34m' },
        { id: 2, date: '2024-12-01', winner: 'Dire', duration: '42m' },
        { id: 3, date: '2024-12-01', winner: 'Radiant', duration: '28m' },
      ],
    }
  },
}
</script>

<style scoped>
.matches-page {
  padding: 2rem;
  text-align: center;
}

.matches-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}
</style>
