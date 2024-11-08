import { defineStore } from 'pinia';

export const useCatalogStore = defineStore('catalog', {
  state: (): {
    catalog: any[];
    locale: string;
  } => ({
    catalog: [],
    locale: 'ru',
  }),
  actions: {
    setCatalog(data: any[]): void {
      console.log("Set catalog", data);
      this.catalog = data;
    },
    setLocale(locale: string): void {
      this.locale = locale;
      console.log(locale, "SetLocale");
    },
    async loadCatalog(): Promise<void> {
      try {
        const response: Response = await fetch('data/task_json.json');
        console.log('Фетчится', response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: any[] = await response.json();
        this.setCatalog(data);
      } catch (error) {
        console.error('Error loading catalog:', error);
      }
    },
  },
});
