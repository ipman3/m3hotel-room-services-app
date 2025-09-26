import { create } from 'zustand';

export interface OrderItem {
  serviceName: string;
  packageName: string;
  date: Date;
  time: string;
  price: number;
  category: string;
}

interface CartState {
  items: OrderItem[];
  addItem: (item: OrderItem) => void;
  removeItem: (serviceName: string) => void;
  clearCart: () => void;
}

export const useOrderStore = create<CartState>((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (serviceName) => set((state) => ({ 
    items: state.items.filter((item) => item.serviceName !== serviceName) 
  })),
  clearCart: () => set({ items: [] }),
}));
