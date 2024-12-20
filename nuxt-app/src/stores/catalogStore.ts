import { defineStore } from 'pinia';
import { Product } from "@/src/utils/types";

export const useCatalogStore = defineStore('catalog', {
  state: (): {
    catalog: Product[];
    locale: string;
    isLoading: boolean;
    isError: boolean;
  } => ({
    catalog: [],
    locale: 'ru',
    isLoading: true,
    isError: false,
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
          throw new Error('Response not ok');
        }
        
        const data: Product[] = await response.json();
        this.setCatalog(data);
      } catch (error) {
        this.isError = true
      } finally {
        this.isLoading = false;   
      }
    },
  },
});
