<template>
  <div class="container">
    <h1 class="header">Каталог товаров</h1>
    <Home />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useCatalogStore } from '@/src/stores/catalogStore';
import Home from '@/src/components/Home.vue'; 

const catalogStore = useCatalogStore();

onMounted(() => {
  catalogStore.loadCatalog();
});
</script>

<style scoped>
.container {
  padding: 10px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f9fafb;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header {
  color: #1f2937;
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 0.5rem;
}
</style>
