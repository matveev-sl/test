<template>
  <div>
   <LocaleSwitcher />
    <div v-if="catalog && catalog.length">
      <div v-for="item in catalog" :key="item.id">
        <Product :product="item"/>
      </div>
    </div>
    <div v-else>
      <p>Загрузка...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useCatalogStore } from '@/stores/catalogStore';
import Product from './Product.vue';
import LocaleSwitcher from './LocaleSwitcher.vue';

// Получаем доступ к хранилищу каталога
const catalogStore = useCatalogStore();
const catalog = computed(() => catalogStore.catalog); 
console.log("Загрузка каталога из пиньи", catalog)
const locale = computed(() => catalogStore.locale); // Текущий язык из Pinia


// Загружаем данные каталога при монтировании компонента
onMounted(() => {
  catalogStore.loadCatalog();
});
</script>
