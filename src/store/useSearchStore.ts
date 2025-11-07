import type { GetAllSpa } from "@/hooks/wellness-spa/useGetAllSpa";
import { create } from "zustand";

export type SearchResult = GetAllSpa;

interface SearchState {
  searchResults: SearchResult[];
  loading: boolean;
  error: string | null;
  setSearchResults: (results: SearchResult[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  searchResults: [],
  loading: false,
  error: null,
  setSearchResults: (results) => set({ searchResults: results }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));