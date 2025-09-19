import type { ReactNode } from "react";

export interface NavItem {
  label: string;
  path: string;
  icon: ReactNode;
}

import { Home, Menu, BellDot, ShoppingCart } from "lucide-react";

const navItems = [
  {
    path: '/',
    label: 'Home',
    icon: Home, 
  },
   {
    path: '/menu',
    label: 'Menu',
    icon: Menu,
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
