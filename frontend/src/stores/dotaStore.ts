// src/stores/matchStore.ts
import type { Match } from '../types/Match'
import { defineStore } from 'pinia'

// Define the store to manage the match data
export const useMatchStore = defineStore('match', {
  state: () => ({
    matches: [] as Match[],
  }),
  actions: {
    // Method to add a match to the store
    addMatch(match: Match) {
      this.matches.push(match)
    },

    // Example of a method to fetch data (e.g., from an API)
    async fetchMatches() {
      const data = await fetch('/api/matches') // Replace with your API call
      const matches = await data.json()
      this.matches = matches
    },
  },
})
