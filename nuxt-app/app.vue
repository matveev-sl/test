<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useCatalogStore } from '@/stores/catalogStore';
</script>

<style>
/* Ваши стили для App.vue */
</style>
