import { defineStore } from 'pinia';
import { Product} from "types"
export const useCatalogStore = defineStore('catalog', {
  state: (): {
    catalog: Product[];
    locale: string;
  } => ({
    catalog: [],
    locale: 'ru',
  }),
  actions: {
    setCatalog(data: Product[]): void {
      console.log("Set catalog", data);
      this.catalog = data;
    },
    setLocale(locale: string): void {
      this.locale = locale;
      console.log(locale, "SetLocale");
    },
    async loadCatalog(): Promise<void> {
      try {
        const response: Response = await fetch('/api/catalog');
        console.log('Ответ каталога', response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Product[] = await response.json();
        this.setCatalog(data);
      } catch (error) {
        console.error('Error loading catalog:', error);
      }
    },
  },
});
