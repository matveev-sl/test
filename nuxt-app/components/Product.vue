<template>
    <div>
      <p>Крошки: {{ breadcrumbs }} </p>
  
      <h3>{{ productName }}</h3>
      <p>ID : {{ product.id }}</p>
  
      <a :href="productLink">{{ productLink }}</a>
      <button 
        v-if="hasChildren" 
        @click="toggleVisibility" 
        :class="{
          'bg-blue-500 text-white py-2 px-4 rounded': true,
          'hover:bg-blue-600': isVisible,
          'bg-gray-500 hover:bg-gray-600': !isVisible
        }"
      >
        {{ isVisible ? 'Скрыть' : 'Показать' }}
      </button>
      <div v-if="isVisible" v-for="child in product.childs" :key="child.id">
        <Product :product="child" />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed, ref } from 'vue';
  import { useCatalogStore } from '@/stores/catalogStore';
  import { ProductType } from '@/types';  // Предполагаем, что тип ProductType определен в types.ts
  import Product from './Product.vue';
  
  const catalogStore = useCatalogStore();
  const locale = computed(() => catalogStore.locale);
  const isVisible = ref(false);
  
  const props = defineProps<{
    product: ProductType; 
  }>();
  
  function getLocaleName(item: { locale: Record<string, { cg_name: string }> }, locale: string): string {
    const nameInLocale = item.locale[locale]?.cg_name;
    if (nameInLocale) {
      return nameInLocale;
    }
  
    for (const key in item.locale) {
      const fallbackName = item.locale[key]?.cg_name;
      if (fallbackName) {
        return fallbackName;
      }
    }
  
    return 'Anyway_unknown';
  }
  
  function getLocaleLink(item: { locale: Record<string, { link: string }> }, locale: string): string {
    const linkInLocale = item.locale[locale]?.link;
    if (linkInLocale) {
      return linkInLocale;
    }
  
    for (const key in item.locale) {
      const fallbackLink = item.locale[key]?.link;
      if (fallbackLink) {
        return fallbackLink;
      }
    }
  
    return 'Anyway_unknown';
  }
  
  function getBreadcrumbs(catalog: ProductType[], pathIds: string[], locale: string): string {
    const breadcrumbs: string[] = [];
    let currentLevel = catalog;
  
    for (let i = pathIds.length - 1; i >= 0; i--) {
      const id = pathIds[i];
      const item = currentLevel.find((el) => el.id === id);
  
      if (item) {
        breadcrumbs.push(getLocaleName(item, locale)); 
        currentLevel = item.childs || [];
      } else {
        break;
      }
    }
  
    return breadcrumbs.reverse().join(' -> ');
  }
  
  const breadcrumbs = computed(() => {
    return getBreadcrumbs(catalogStore.catalog, props.product.path_to_top, locale.value);
  });
  
  const productName = computed(() => {
    return getLocaleName(props.product, locale.value);
  });
  
  const productLink = computed(() => {
    return getLocaleLink(props.product, locale.value);
  });
  
  const hasChildren = computed(() => props.product.childs && props.product.childs.length > 0);
  
  const toggleVisibility = () => {
    isVisible.value = !isVisible.value;
  };
  </script>
  