import type { CartItem } from "@/store/CartStore";

export interface OrderItems {
  id: string;
  name: string;
  roomNumber: string;
  orderDate: string;
  orderId: string;
  totalAmount: number;
  category: string;
  imageUrl: string;
  items: CartItem[];
};
