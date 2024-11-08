<template>
  <div>
    <LocaleSwitcher />
    <div v-if="catalog && catalog.length">
      <div v-for="item in catalog" :key="item.id">
        <ProductCard :product="item" />
      </div>
    </div>
    <div v-if="isLoading">
      <p>Загрузка...</p>
    </div>
    <div v-else-if="isError">
      <p>{{ isError }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
//TODO: Создать isloading и isError
import { computed, onMounted } from 'vue';
import { useCatalogStore } from '@/stores/catalogStore';
import ProductCard from './Product.vue';
import LocaleSwitcher from './LocaleSwitcher.vue';

const isLoading = 
const isError = 
const catalogStore = useCatalogStore();

const catalog = computed(() => catalogStore.catalog);

onMounted(() => {
  catalogStore.loadCatalog();
});
</script>
