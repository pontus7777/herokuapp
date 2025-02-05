<template>
  <div class="item-group">
    <h3>{{ qual }}</h3>
    <div class="group">
      <ItemCard v-for="item in group" :key="item.id" :item="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { DotaItem } from '../types/DotaItem'
import ItemCard from '../components/ItemCard.vue'

defineProps<{
  qual: string
  group: DotaItem[]
}>()
</script>

<style scoped>
.item-group {
  margin-bottom: 2rem;
}

.group {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 10px; /* Space between cards */
}
</style>
