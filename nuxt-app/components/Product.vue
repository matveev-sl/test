<template>
     <div>
        <p>{{ breadcrumbs(product) }}</p>
     
        <h3>{{ product.locale[locale].cg_name ?? "Неизвестно" }}</h3>
        <p>ID : {{ product.id }}</p>
        <p>Крошки: {{ breadcrumbs(product)}} </p>
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

const breadcrumbs = (item) => {
  if (!item?.path_to_top || item.path_to_top.length === 0) {
    return item.locale[locale.value]?.cg_name;
  }
  const levels = Object.values(item.path_to_top)

  console.log ('Ищем крошки', levels)
  const currentName = item.locale[locale.value]?.cg_name ?? "Unknown";
  
  return `${levels.join(' -> ')} -> ${currentName}`;
};
const hasChildren = computed(() => props.product.childs);
const toggleVisibility = () => {
  isVisible.value = !isVisible.value;
};
</script>