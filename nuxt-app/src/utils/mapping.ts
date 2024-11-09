import { Product, locale as LocaleType } from "@/src/utils/types";

const supportedLocales: LocaleType[] = ['ru', 'fr', 'en'];

export const mapProduct = (data: unknown): Product => {
  if (typeof data !== 'object' || data === null) {
    throw new Error(`Product should be an object`);
  }
  if (!('id' in data)) {
    throw new Error('Product without id');
  }

  const id = Number((data as any).id);
  if (isNaN(id)) {
    throw new Error('Product id is not a number');
  }

  const localeData = (data as any).locale;
  if (!localeData || typeof localeData !== 'object') {
    throw new Error('Product should have at least one locale');
  }

  const locale: Record<LocaleType, { cg_name?: string; link?: string }> = {} as Record<LocaleType, { cg_name?: string; link?: string }>;
  for (const [key, value] of Object.entries(localeData)) {
    if (supportedLocales.includes(key as LocaleType) && typeof value === 'object') {
      locale[key as LocaleType] = { cg_name: value.cg_name, link: value.link };
    }
  }

  let childs: Product[] = [];
  if ('childs' in data && Array.isArray((data as any).childs)) {
    childs = (data as any).childs.map(mapProduct);
  }

  return { id, locale, childs };
};

export const mapServerData = (data: unknown): Product[] => {
  if (!Array.isArray(data)) {
    throw new Error("Data is not an array");
  }
  return data.map(mapProduct);
};
