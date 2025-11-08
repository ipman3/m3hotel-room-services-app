import type { SearchResult } from "@/store/useSearchStore";

export function normalizeSearchData(items: any[]): SearchResult[] {
  return items.map((item) => ({
    ...item,
    image: item.image || item.photo || "",
    short_desc: item.short_desc || item.desc || "",
    price: item.price || item.cost || item.amount || "0",
  }));
}