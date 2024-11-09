<template>
  <div>
    <h1>Каталог товаров</h1>
    <Home />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useCatalogStore } from '@/src/stores/catalogStore';
import Home from '@/src/components/Home.vue'; 

const catalogStore = useCatalogStore();

onMounted(() => {
  catalogStore.loadCatalog()
  })
</script>

<style>
/* Ваши стили для App.vue */
</style>
