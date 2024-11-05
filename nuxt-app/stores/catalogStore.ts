// stores/catalogStore.ts
import { defineStore } from 'pinia';

export const useCatalogStore = defineStore('catalog', {
  state: () => ({
    catalog: [] as any[],
    locale: 'ru',
  }),
  actions: {
    setCatalog(data: any) {
      this.catalog = data;
    },
    setLocale(locale: string) {
      this.locale = locale;
    },
  },
});
