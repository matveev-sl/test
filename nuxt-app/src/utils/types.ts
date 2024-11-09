export type Locale = 'ru' | 'fr' | 'en';
export interface Product {
  id: number;
  locale: Record<Locale, { cg_name?: string; link?: string }>;
  path_to_top?: number[];
  childs: Product[];
}
