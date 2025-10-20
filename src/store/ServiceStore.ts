// src/store/ServiceStore.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { serviceSchema, type ServiceSchema } from "@/validations/serviceSchema";

interface ServiceState {
  cart: ServiceSchema[];
  addToCart: (service: ServiceSchema) => void;
  removeFromCart: (name: string) => void;
  updateQuantity: (name: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useServiceStore = create<ServiceState>()(
  devtools((set, get) => ({
    cart: [],

    addToCart: (service) => {
      const parsed = serviceSchema.safeParse(service);
      if (!parsed.success) {
        alert(parsed.error.issues?.[0]?.message ?? "Invalid service data");
        return;
      }

      const valid = parsed.data;
      const existing = get().cart.find((i) => i.name === valid.name);

      if (existing) {
        set((state) => ({
          cart: state.cart.map((i) =>
            i.name === valid.name
              ? { ...i, quantity: i.quantity + valid.quantity }
              : i
          ),
        }));
      } else {
        set((state) => ({ cart: [...state.cart, valid] }));
      }
    },

    removeFromCart: (name) =>
      set((state) => ({
        cart: state.cart.filter((item) => item.name !== name),
      })),

    updateQuantity: (name, quantity) =>
      set((state) => ({
        cart: state.cart.map((i) =>
          i.name === name ? { ...i, quantity: Math.max(1, quantity) } : i
        ),
      })),

    clearCart: () => set({ cart: [] }),

    getTotal: () =>
      get().cart.reduce(
        (sum, i) => sum + (i.price ?? 0) * (i.quantity ?? 1),
        0
      ),
  }))
);
