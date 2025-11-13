import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  serviceType?: string;
  id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
  discount?: string;

  //additional for room service
  description: string;
  serviceName?: string;
  // packageName?: string;
  date?: Date;
  time?: string;
  message: string;
  category: number;
}

interface CartState {
  items: CartItem[];
  pendingItem: Partial<CartItem> | null;
  setPendingItem: (item: Partial<CartItem> | null) => void;
  confirmPendingItem: () => void;
  addItem: (item: Partial<CartItem>) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  clearCart: () => void;
  clearCartByServiceType: (serviceType: string) => void;
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
          const newItem = { ...state.pendingItem } as CartItem;
          return {
            items: [...state.items, newItem],
            // pendingItem: null,
          };
        }),
      addItem: (item) =>
        set((state: any) => {
          const existingItemIndex = state.items.findIndex((i: any) => i.id === item.id && i.serviceType === item.serviceType);
          if (existingItemIndex !== -1) {
            // Item exists, update quantity
            const updatedItems = [...state.items];
            const existingItem = updatedItems[existingItemIndex];
            updatedItems[existingItemIndex] = {
              ...existingItem,
              quantity: existingItem.quantity + (item.quantity || 1),
            };
            return { items: updatedItems };
          } else {
            return { items: [...state.items, item] };
          }
        }),
      removeItem: (itemId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        })),
      updateQuantity: (itemId, newQuantity) =>
        set((state) => ({
          items: state.items.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)),
        })),
      clearCart: () => set({ items: [], pendingItem: null }),
      clearCartByServiceType: (serviceType: string) =>
        set((state) => ({
          items: state.items.filter((item) => item.serviceType !== serviceType),
        })),
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
