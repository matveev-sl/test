<template>
     <div>
        <p>Крошки: {{ breadcrumbs}} </p>
     
        <h3>{{ product.locale[locale].cg_name ?? "Unknown" }}</h3>
        <p>ID : {{ product.id }}</p>
       
        <a :href="product.locale[locale].link">{{ product.locale[locale].link }}</a>
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
        <div v-if="isVisible" v-for="child in product.childs">
      <Product :product="child" />
    </div>
        
      </div>
</template>

<script setup lang="ts">

import { computed, ref } from 'vue';
import { useCatalogStore } from '@/stores/catalogStore';
const catalogStore = useCatalogStore();
const locale = computed(() => catalogStore.locale);
const full = computed(() => catalogStore)
console.log ("Locale", locale);

const isVisible = ref(false);
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

function getBreadcrumbs(catalog, pathIds, locale) {
  const breadcrumbs = [];
  let currentLevel = catalog;

  for (let i = pathIds.length - 1; i >= 0; i--) {
    const id = pathIds[i];
    const item = currentLevel.find((el) => el.id === id);

    if (item) {
      breadcrumbs.push(item.locale[locale]?.cg_name || "Unknown");
      currentLevel = item.childs || []; 
    } else {
      break;
    }
  }

  return breadcrumbs.reverse().join(" -> ");
}
function getLocaleName(item, locale) {
  // Проверка на наличие имени на текущей локали
  if (item.locale[locale]?.cg_name) {
    return item.locale[locale].cg_name;
  }

  // Если имя на текущей локали не найдено, ищем на первой доступной
  for (const key in item.locale) {
    if (item.locale[key]?.cg_name) {
      return item.locale[key].cg_name;
    }
  }

  // Если имя не найдено, возвращаем "Неизвестно"
  return 'Неизвестно';
}
const breadcrumbs = computed(() => {
  return getBreadcrumbs(catalogStore.catalog, props.product.path_to_top, locale.value);
});
const hasChildren = computed(() => props.product.childs);
const toggleVisibility = () => {
  isVisible.value = !isVisible.value;
};
</script>