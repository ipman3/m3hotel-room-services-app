import { create } from "zustand";

interface FlyCard {
  rect: DOMRect;
  image: string;
  name: string;
  price: number;
}

interface FlyToCartState {
  flyingCard: FlyCard | null;
  startFly: (card: FlyCard) => void;
  stopFly: () => void;
}

export const useFlyToCartStore = create<FlyToCartState>((set) => ({
  flyingCard: null,
  startFly: (card) => set({ flyingCard: card }),
  stopFly: () => set({ flyingCard: null }),
}));
