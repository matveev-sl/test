type locale = 'ru'|'fr'|'en'
interface Product {
    id: number;
    locale: Record<locale, { cg_name?: string; link?: string }>;
    childs: Product[];
  }