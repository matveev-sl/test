import { defineStore } from 'pinia';

export const useCatalogStore = defineStore('catalog', {
  state: () => ({
    catalog: [] as any[], // Массив с данными каталога
    locale: 'ru', // Текущий язык
  }),
  actions: {
    setCatalog(data: any) {
      this.catalog = data; // Устанавливаем данные каталога
    },
    setLocale(locale: string) {
      this.locale = locale; // Устанавливаем язык
    },
    async loadCatalog() {
      try {
        const response = await fetch('data/task_json.txt');
        console.log('Фетчится', response)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json(); // Парсим данные в формате JSON
        this.setCatalog(data); // Устанавливаем данные в состояние
      } catch (error) {
        console.error('Error loading catalog:', error); // Логируем ошибку в консоль
      }
    },
  },
});
