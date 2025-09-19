import { create } from "zustand";
import { persist } from "zustand/middleware";

interface NavbarState {
  isVisible: boolean;
  show: () => void;
  hide: () => void;
}

const useNavbarStore = create<NavbarState>()(
  persist(
    (set) => ({
      isVisible: true,
      show: () =>
        set((state) => ({
          ...state,
          isVisible: true,
        })),
      hide: () =>
        set((state) => ({
          ...state,
          isVisible: false,
        })),
    }),
    {
      name: "navbar-storage", 
    }
  )
);

export default useNavbarStore;
