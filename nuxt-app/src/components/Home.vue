<template>
  <div class="p-6 max-w-screen-xl mx-auto">
    <LocaleSwitcher />
    <div v-if="catalog && catalog.length">
      <div v-for="item in catalog" :key="item.id" class="product-card">
        <ProductCard :product="item" />
      </div>
    </div>
    <div v-if="isLoading" class="text-center py-4">
      <p class="text-blue-500">Загрузка...</p>
    </div>
    <div v-else-if="isError" class="text-center py-4">
      <p class="text-red-500">{{ isError }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useCatalogStore } from '@/src/stores/catalogStore';
import ProductCard from './Product.vue';
import LocaleSwitcher from './LocaleSwitcher.vue';

const catalogStore = useCatalogStore();
const catalog = computed(() => catalogStore.catalog);
const isLoading = computed(() => catalogStore.isLoading);
const isError = computed(() => catalogStore.isError);

onMounted(() => {
  catalogStore.loadCatalog();
});
</script>

<style scoped>

</style>
