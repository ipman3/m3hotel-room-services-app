import { create } from "zustand";

type CategoryState = {
  activeCategory: number | null;
  setActiveCategory: (category: number | null) => void;
  clearCategoryFilters: () => void;
};

export const useCategoryStore = create<CategoryState>((set) => ({
  activeCategory: null,
  setActiveCategory: (category) => set({ activeCategory: category }),
  clearCategoryFilters: () => set({ activeCategory: null }),
}));
