<template>
  <div class="search-page">
    <SearchBar @search="handleSearch" />
    <PlayerList :players="players" />
    <PaginationList
      :currentPage="currentPage"
      :pageSize="pageSize"
      :playersCount="playersCount"
      @page-change="handlePageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import axios from 'axios'
import SearchBar from '../components/SearchBar.vue'
import PlayerList from '../components/PlayerList.vue'
import type { PlayerSearchResult } from '../types/PlayerSearchResult'
import PaginationList from '../components/PaginationList.vue'

const players = ref<PlayerSearchResult[]>([])
const query = ref('')
const currentPage = ref(1)
const pageSize = 10

// Get the total count of players to enable pagination logic
const playersCount = computed(() => players.value.length)

// Fetch players based on the query
const fetchPlayers = async (searchQuery: string) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/v1/search?q=${searchQuery}&page=${currentPage.value}`,
    )
    players.value = response.data // Assign fetched data to players
  } catch (error) {
    console.error('Error fetching players:', error) // Error handling
  }
}

// Handle the search action from SearchInput component
const handleSearch = (searchQuery: string) => {
  query.value = searchQuery
  fetchPlayers(searchQuery) // Fetch players for the search query
}

// Handle page changes (pagination)
const handlePageChange = (newPage: number) => {
  currentPage.value = newPage
  fetchPlayers(query.value) // Fetch new page of players based on current query
}
</script>

<style scoped>
.search-page {
  padding: 16px;
  max-width: 800px; /* You can adjust this value based on your design */
  margin: 0 auto; /* Centers the search page */
}
</style>
