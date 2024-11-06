<template>
     <div>
        <p>{{ breadcrumbs(product) }}</p>
     
        <h3>{{ product.locale[locale].cg_name ?? "Неизвестно" }}</h3>
        <p>ID : {{ product.id }}</p>
        <a :href="product.locale[locale].link">{{ product.locale[locale].link }}</a>

        <div v-for = "child in product.childs">
<Product :product ="child" />
        </div>
      </div>
</template>

<script setup lang="ts">

import { computed } from 'vue';
import { useCatalogStore } from '@/stores/catalogStore';
const catalogStore = useCatalogStore();
const locale = computed(() => catalogStore.locale);
console.log ("Locale", locale)
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});
const breadcrumbs = (item: any) => {
  return item?.path_to_top.join(' -> ') ?? "";
};
</script>