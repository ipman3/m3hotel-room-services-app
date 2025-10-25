import { useNavigate, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useNavItems } from "@/config/navItems";
import useNavbarStore from "@/store/Navbar";
import { useCartStore } from "@/store/CartStore";

export default function BottomNav() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navItems = useNavItems();

  const { isVisible } = useNavbarStore((state) => state);
  const cartItemCount = useCartStore((state) => state.items.length);

  if (!isVisible) return null;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-muted-background shadow-[0_-2px_4px_-1px_rgba(0,0,0,0.16)] rounded-t-4xl max-w-md mx-auto"
      aria-label="Bottom navigation"
    >
      <div className="flex items-center justify-between h-8 my-4 pt-4">
        <div className="flex justify-around flex-1">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const IconComponent = item.icon as React.ElementType;
            const isCart = item.label === 'Cart';

            return (
              <motion.button
                key={item.path}
                onClick={() => navigate({ to: item.path })}
                className={`relative flex flex-col items-center justify-center text-sm transition-colors ${isActive ? "text-base-primary font-bold" : "text-muted-foreground"}`}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  className="relative w-6 h-6 mb-1"
                  animate={{ y: isActive ? -3 : 0 }}
                >
                  <IconComponent className="w-6 h-6" />
                  {isCart && cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                      {cartItemCount}
                    </span>
                  )}
                </motion.div>
                <h3 className={`${isActive ? "font-bold" : "font-semibold"}`}>{item.label}</h3>
              </motion.button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

