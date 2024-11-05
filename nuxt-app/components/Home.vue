<template>
  <div>
    <!-- Селектор для изменения языка -->
    <select v-model="locale" @change="changeLocale">
      <option value="ru">Русский</option>
      <option value="en">English</option>
      <option value="fr">Français</option>
    </select>

    <div v-if="catalog && catalog.length">
      <div v-for="item in catalog" :key="item.id">
        <h3>{{ item[locale].cg_name }}</h3>
        <p>{{ breadcrumbs(item) }}</p>
        <a :href="item[locale].link">{{ item[locale].link }}</a>
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

// Получаем доступ к хранилищу каталога
const catalogStore = useCatalogStore();
const catalog = computed(() => catalogStore.catalog); 
console.log("Загрузка каталога из пиньи", catalog)
const locale = computed(() => catalogStore.locale); // Текущий язык из Pinia

// Функция для изменения языка
const changeLocale = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  catalogStore.setLocale(target.value); // Обновляем язык в хранилище
};

// Функция для отображения хлебных крошек
const breadcrumbs = (item: any) => {
  return item.path_to_top.join(' -> '); // Объединяем пути в строку
};

// Загружаем данные каталога при монтировании компонента
onMounted(() => {
  catalogStore.loadCatalog();
});
</script>
