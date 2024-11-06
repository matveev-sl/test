import { defineStore } from 'pinia';

export const useCatalogStore = defineStore('catalog', {
  state: () => ({
    catalog: [] as any[], // Массив с данными каталога
    locale: 'ru', // Текущий язык
  }),
  actions: {
    setCatalog(data: any) {
      console.log("Set catalog", data)
      this.catalog = data; // Устанавливаем данные каталога
    },
    setLocale(locale: string) {
      this.locale = locale; // Устанавливаем язык
      console.log (locale, "SetLocale")
    },
    async loadCatalog() {
      try {
        const response = await fetch('data/task_json.json');
        console.log('Фетчится', response)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json(); 
        this.setCatalog(data);
      } catch (error) {
        console.error('Error loading catalog:', error);
      }
    },
  },
});
