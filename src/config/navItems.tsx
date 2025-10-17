import type { ReactNode } from "react";

export interface NavItem {
  label: string;
  path: string;
  icon: ReactNode;
}

import { Home,BellDot, ShoppingCart, HistoryIcon } from "lucide-react";

const navItems = [
  {
    path: '/',
    label: 'Home',
    icon: Home, 
  },
   {
    path: '/orders',
    label: 'Orders',
    icon: HistoryIcon,
  },
  {
    path: '/cart',
    label: 'Cart',
    icon: ShoppingCart,
  },
  {
    path: '/notifications',
    label: 'Notifications',
    icon: BellDot, 
  },
];

export const useNavItems = () => {
  return navItems;
};
