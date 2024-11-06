<template>
    <div>
      <h1>Каталог товаров</h1>
      <Home />
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted } from 'vue';
  import { useCatalogStore } from '@/stores/catalogStore';
  import Home from '@/components/Home.vue'; 
  
  
  const catalogStore = useCatalogStore();
  
  onMounted(() => {
    catalogStore.loadCatalog(); // Загружаем данные каталога при монтировании компонента
  });
  </script>
  
  <style>
  /* Ваши стили для App.vue */
  </style>
  