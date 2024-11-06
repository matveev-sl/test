<template>
     <select :value="locale" @change="changeLocale">
      <option value="ru">Русский</option>
      <option value="en">English</option>
      <option value="fr">Français</option>
    </select>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useCatalogStore } from '@/stores/catalogStore';
const catalogStore = useCatalogStore();
const changeLocale = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  catalogStore.setLocale(target.value); 
};
const locale = computed(() => catalogStore.locale);
console.log ("Locale", locale)
</script>