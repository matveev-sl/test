<template>
  <select 
    :value="locale" 
    @change="changeLocale"
    class="p-2 border rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    style="float: right;"
  >
    <option value="ru">Русский</option>
    <option value="en">English</option>
    <option value="fr">Français</option>
  </select>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCatalogStore } from '@/src/stores/catalogStore';

const catalogStore = useCatalogStore();

const changeLocale = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const value = target.value;
  catalogStore.setLocale(value); 
};

const locale = computed(() => catalogStore.locale);
</script>

<style scoped>
select {
  float: right; 
  margin-top: 10px; 
}
</style>
