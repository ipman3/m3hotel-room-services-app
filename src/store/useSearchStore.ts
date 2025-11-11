import type { ProductType } from "@/types/room-service/roomServiceType";
import type { ThingToDoType } from "@/types/thing-to-do/thingToDoType";
import type { WellnessSpaType } from "@/types/wellness-spa/wellnessSpaType";
import { create } from "zustand";

export interface NormalizedSearchResult {
  id: number;
  name: string;
  image: string;
  short_desc: string;
  price: string | number;
  [key: string]: any;
}

export type SearchResult = NormalizedSearchResult & (WellnessSpaType | ThingToDoType | ProductType);

interface SearchState {
  searchResults: SearchResult[];
  loading: boolean;
  error: string | null;
  setSearchResults: (results: SearchResult[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearSearchResults: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  searchResults: [],
  loading: false,
  error: null,
  setSearchResults: (results) => set({ searchResults: results }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearSearchResults: () => set({ searchResults: [] }),
}));