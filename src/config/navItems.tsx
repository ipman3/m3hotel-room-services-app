import type { ReactNode } from "react";

export interface NavItem {
  label: string;
  path: string;
  icon: ReactNode;
}

import { Home, Menu, Settings, User } from "lucide-react";

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
    path: '/profile',
    label: 'Profile',
    icon: User,
  },
  {
    path: '/settings',
    label: 'Settings',
    icon: Settings, 
  },
];

export const useNavItems = () => {
  return navItems;
};
