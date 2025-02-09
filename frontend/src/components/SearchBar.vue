<template>
  <input
    v-model="query"
    @keyup.enter="handleSearch"
    class="search-input"
    placeholder="Search for players"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const query = ref('')
const emit = defineEmits<{
  (e: 'search', query: string): void // Event name 'search', payload type is a string (the search query)
}>()

// Emit the search query when 'Enter' is pressed
const handleSearch = () => {
  emit('search', query.value) // Emitting the search event to the parent component
}
</script>

<style scoped>
.search-input {
  width: 100%; /* Make the input take up the full width of its container */
  max-width: 500px; /* You can adjust this to limit the width of the input */
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box; /* Ensures padding does not expand the element */
}
</style>
