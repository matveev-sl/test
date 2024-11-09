<template>
  <div class="p-3 max-w-screen-lg mx-auto">
    <p class="text-gray-500 mb-4">{{ breadcrumbs }}</p>
    <h3 class="text-2xl font-semibold mb-2">{{ productName }}</h3>
    <p class="text-gray-600 mb-4 text-sm">{{ product.id }}</p>
    <a :href="productLink" class="text-blue-500 hover:text-blue-700 mb-4 block text-xs">
      {{ productLink }}
    </a>
    <button 
      v-if="hasChildren" 
      @click="toggleVisibility" 
      :class="{
        'bg-blue-500 text-white py-2 px-4 rounded': true,
        'hover:bg-blue-600': isVisible,
        'bg-gray-500 hover:bg-gray-600': !isVisible
      }"
      class="mb-4 text-xs"
    >
      {{ isVisible ? 'Скрыть' : 'Показать' }}
    </button>
    <div v-if="isVisible" class="space-y-4">
      <ul class="list-none pl-0">
        <li 
          v-for="(child, index) in product.childs" 
          :key="child.id" 
          :class="[ 
            'child-item', 
            { 'bg-gray-100': index % 2 === 0, 'bg-gray-200': index % 2 !== 0 }
          ]"
        >
          <div class="flex items-center space-x-2">
            <div class="tree-line"></div>
            <div class="triangle"></div>
            <ProductCard :product="child" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useCatalogStore } from '@/src/stores/catalogStore';
import { Product } from '@/src/utils/types'; 
import ProductCard from './Product.vue';

const catalogStore = useCatalogStore();
const locale = computed(() => catalogStore.locale);
const isVisible = ref(false);

const props = defineProps<{
  product: Product; 
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

function getBreadcrumbs(catalog: Product[], pathIds: number[], locale: string): string {
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

<style scoped>

</style>
