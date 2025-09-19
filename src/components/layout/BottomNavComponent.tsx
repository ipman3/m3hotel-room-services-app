import { useNavigate, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useNavItems } from "@/config/navItems";
import useNavbarStore from "@/store/Navbar";
import React from "react";

const BottomNav = () => {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navItems = useNavItems();

  const { isVisible } = useNavbarStore((state) => state);

  if (!isVisible) return null;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white z-50 shadow-[0_-2px_4px_-1px_rgba(0,0,0,0.16)]"
      aria-label="Bottom navigation"
    >
      <ul className="flex items-center justify-between h-16 my-4">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const IconComponent = item.icon as React.ElementType;

          return (
            <li key={item.path} className="flex justify-center flex-1">
              <motion.button
                onClick={() => navigate({ to: item.path })}
                className={`
                  relative flex flex-col items-center justify-center text-sm transition-all duration-200 ease-in-out
                  ${isActive ? "text-base-primary font-semibold" : "text-muted-foreground font-semibold"}
                `}
                aria-current={isActive ? "page" : undefined}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
              >
                <motion.div
                  className="w-6 h-6 mb-1.5"
                  animate={{ y: isActive ? -5 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                   <IconComponent
                    className={`w-6 h-6 ${
                      isActive ? "text-base-primary" : "text-muted-foreground"
                    }`}
                  />
                </motion.div>

                <h3>{item.label}</h3>
              </motion.button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default BottomNav;
