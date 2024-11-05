<template>
  <div v-if="catalogData.length">
    <CatalogTree :items="catalogData" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCatalogStore } from '@/stores/catalogStore'

const catalogStore = useCatalogStore()

onMounted(() => {
  catalogStore.loadCatalog()
})
</script>
