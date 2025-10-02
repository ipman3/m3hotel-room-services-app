import { create } from "zustand";

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
  addItem: (item: Omit<OrderItem, "id">) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
}

export const useOrderStore = create<CartState>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => ({
      items: [...state.items, { ...item, id: crypto.randomUUID() }],
    })),
  removeItem: (itemId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== itemId),
    })),
  clearCart: () => set({ items: [] }),
}));
