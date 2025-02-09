<template>
  <div class="items-page">
    <header>
      <h2>All Items</h2>
    </header>
    <section class="items-list">
      <ItemGroup v-for="(group, qual) in groupedItems" :key="qual" :qual="qual" :group="group" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { DotaItem } from '../types/DotaItem'
import ItemGroup from '../components/ItemGroup.vue'

const groupedItems = ref<Record<string, DotaItem[]>>({})

const cdnAddress = 'https://cdn.cloudflare.steamstatic.com'

const fetchItems = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/v1/constants/items')
    const data: Record<string, DotaItem> = await response.json()

    const groupedItemsTemp: Record<string, DotaItem[]> = {}

    Object.values(data)
      .map((item) => ({
        id: item.id,
        img: `${cdnAddress}${item.img}`,
        dname: item.dname,
        qual: item.qual,
        cost: item.cost,
        behavior: item.behavior,
        notes: item.notes,
        mc: item.mc,
        hc: item.hc,
        cd: item.cd,
        lore: item.lore,
        components: item.components ?? null,
        created: item.created,
        charges: item.charges,
        abilities: item.abilities ?? [],
        hint: item.hint ?? [],
        attrib: item.attrib,
      }))
      .filter((item) => item.dname && !item.dname.toLowerCase().includes('recipe'))
      .forEach((item) => {
        const qualGroup = item.qual || 'unknown'
        if (!groupedItemsTemp[qualGroup]) {
          groupedItemsTemp[qualGroup] = []
        }
        groupedItemsTemp[qualGroup].push(item)
      })

    groupedItems.value = groupedItemsTemp
  } catch (error) {
    console.error('Error fetching items:', error)
  }
}

onMounted(() => {
  fetchItems()
})
</script>
