import { create } from "zustand";

type CategoryState = {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
};

export const useCategoryStore = create<CategoryState>((set) => ({
  activeCategory: "All",
  setActiveCategory: (category) => set({ activeCategory: category }),
}));
