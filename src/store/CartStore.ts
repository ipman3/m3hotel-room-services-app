import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface OrderItem {
  id: string;
  serviceName: string;
  packageName: string;
  date: Date;
  time: string;
  price: number;
  category: string;
}

interface CartState {
  items: OrderItem[];
  pendingItem: Omit<OrderItem, "id"> | null; 
  setPendingItem: (item: Omit<OrderItem, "id">) => void; 
  confirmPendingItem: () => void; 
  addItem: (item: Omit<OrderItem, "id">) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
}

export const useOrderStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      pendingItem: null,
      setPendingItem: (item) => set({ pendingItem: item }),
      confirmPendingItem: () =>
        set((state) => {
          if (!state.pendingItem) return {};
          const newItem = { ...state.pendingItem, id: crypto.randomUUID() };
          return {
            items: [...state.items, newItem],
            pendingItem: null,
          };
        }),
      addItem: (item) =>
        set((state) => ({
          items: [...state.items, { ...item, id: crypto.randomUUID() }],
        })),
      removeItem: (itemId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "order-storage",
      partialize: (state) => ({ items: state.items }),
      storage: createJSONStorage(() => localStorage, {
        reviver: (key, value) => {
          if (key === "date" && typeof value === "string") {
            return new Date(value);
          }
          return value;
        },
      }),
    }
  )
);
