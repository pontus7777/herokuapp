<template>
  <div class="item-card">
    <img :src="item.img" :alt="item.dname" class="item-image" />
    <h3 class="item-name">{{ item.dname }}</h3>
    <p class="item-cost">Cost: {{ item.cost }}</p>

    <div v-if="item.lore" class="item-lore">
      <p>{{ item.lore }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { DotaItem } from '../types/DotaItem'

defineProps<{
  item: DotaItem
}>()
</script>

<style scoped>
.item-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #222;
  padding: 0.5rem; /* Smaller padding */
  border-radius: 8px;
  width: 120px; /* Reduced width for smaller cards */
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease-in-out;
  height: auto;
  margin: 10px; /* Adding space between cards */
}

.item-card:hover {
  transform: scale(1.05);
}

.item-image {
  width: 60px; /* Reduced image size */
  height: 60px;
  object-fit: contain;
}

.item-name {
  color: #fff;
  font-size: 1rem; /* Reduced font size */
  margin-top: 0.3rem;
}

.item-cost {
  color: #f1c40f;
  font-size: 0.8rem; /* Smaller cost text */
  margin-top: 0.3rem;
}

.item-lore {
  color: #ccc;
  font-size: 0.8rem;
  margin-top: 0.3rem;
  text-align: center;
}
</style>
