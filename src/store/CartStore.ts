import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  packageName?: string;
  serviceTypeId: number;
  serviceType: string;
  date?: Date;
  time?: string;
  price: number;
  category: string;
  message: string;
  imageUrl: string;
  description: string;
  quantity?: number;
}

interface CartState {
  items: CartItem[];
  pendingItem: Omit<CartItem, "id"> | null;
  setPendingItem: (item: Omit<CartItem, "id"> | null) => void;
  confirmPendingItem: () => void;
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  clearCartByServiceType: (serviceType: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
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
            // pendingItem: null,
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
      updateQuantity: (itemId, newQuantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
          ),
        })),
      clearCartByServiceType: (serviceType: string) =>
        set((state) => ({
          items: state.items.filter((item) => item.serviceType !== serviceType),
        })),
      clearCart: () => set({ items: [], pendingItem: null }),
    }),
    {
      name: "cartItems-storage",
      partialize: (state) => ({
        items: state.items,
        pendingItem: state.pendingItem,
      }),
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
