<template>
  <div class="pagination">
    <button @click="previousPage" :disabled="isFirstPage">Previous</button>
    <button @click="nextPage" :disabled="isLastPage">Next</button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Define props for the pagination component
const props = defineProps<{
  currentPage: number
  pageSize: number
  playersCount: number
}>()

// Define the custom event 'page-change' that expects a 'number' as an argument
const emit = defineEmits<{
  (event: 'page-change', page: number): void
}>()

// Computed properties to determine if it's the first or last page
const isFirstPage = computed(() => props.currentPage === 1)
const isLastPage = computed(() => props.playersCount <= props.pageSize * props.currentPage)

// Methods to handle pagination
const nextPage = () => {
  if (!isLastPage.value) {
    emit('page-change', props.currentPage + 1)
  }
}

const previousPage = () => {
  if (!isFirstPage.value) {
    emit('page-change', props.currentPage - 1)
  }
}
</script>

<style scoped>
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.pagination button {
  padding: 10px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  cursor: pointer;
}

.pagination button:disabled {
  cursor: not-allowed;
  background-color: #ddd;
}
</style>
