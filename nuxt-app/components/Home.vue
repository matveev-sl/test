<template>
  <div>
    <LocaleSwitcher />
    <div v-if="catalog && catalog.length">
      <div v-for="item in catalog" :key="item.id">
        <Product :product="item" />
      </div>
    </div>
    <div v-else>
      <p>Загрузка...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useCatalogStore } from '@/stores/catalogStore';
import Product from './Product.vue';
import LocaleSwitcher from './LocaleSwitcher.vue';

interface ProductItem {
  id: number;
  name: string;
  locale: Record<string, { cg_name: string; link: string }>;
  childs?: ProductItem[];
}

const catalogStore = useCatalogStore();

const catalog = computed<ProductItem[]>(() => catalogStore.catalog);

console.log("Загрузка каталога из пиньи", catalog);

const locale = computed<string>(() => catalogStore.locale); 

onMounted(() => {
  catalogStore.loadCatalog();
});
</script>
