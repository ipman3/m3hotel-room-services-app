import { useState } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { X, Headphones } from "lucide-react";
import { useNavItems } from "@/config/navItems";
import useNavbarStore from "@/store/Navbar";
import { useOrderStore } from "@/store/CartStore"; // 1. Import your order store
import { Button } from "@/components/ui/button";
import { ContactFabMenu } from "../ContactFabActions";

export default function BottomNav() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navItems = useNavItems();

  const { isVisible } = useNavbarStore((state) => state);
  const [isFabOpen, setIsFabOpen] = useState(false);
  
  // 2. Get the number of items from the Zustand store
  const cartItemCount = useOrderStore((state) => state.items.length);

  const leftNavItems = navItems.slice(0, 2);
  const rightNavItems = navItems.slice(2);

  const handleFabClick = () => {
    setIsFabOpen(!isFabOpen);
  };

  if (!isVisible) return null;

  return (
    <>
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 bg-muted-background shadow-[0_-2px_4px_-1px_rgba(0,0,0,0.16)]"
        aria-label="Bottom navigation"
      >
        <ContactFabMenu
          isOpen={isFabOpen}
          onClose={() => setIsFabOpen(false)}
        />

        <div className="flex items-center justify-between h-16 my-4">
          {/* Left Nav Items */}
          <div className="flex justify-around flex-1">
            {leftNavItems.map((item) => {
              const isActive = pathname === item.path;
              const IconComponent = item.icon as React.ElementType;
              return (
                <motion.button
                  key={item.path}
                  onClick={() => navigate({ to: item.path })}
                  className={`relative flex flex-col items-center justify-center text-sm transition-colors ${isActive ? "text-base-primary" : "text-muted-foreground"}`}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div
                    className="w-6 h-6 mb-1.5"
                    animate={{ y: isActive ? -5 : 0 }}
                  >
                    <IconComponent className="w-6 h-6" />
                  </motion.div>
                  <h3 className="font-semibold">{item.label}</h3>
                </motion.button>
              );
            })}
          </div>

          {/* Central Button */}
          <div className="relative -top-9">
            <Button
              size={"sm"}
              onClick={handleFabClick}
              className="w-12 h-12 rounded-full bg-base-primary customShadowXl"
              aria-label="Open menu"
            >
              <div key={isFabOpen ? "x" : "question"}>
                {isFabOpen ? (
                  <X className="w-8 h-8" />
                ) : (
                  <Headphones className="w-8 h-8 transition-all duration-300" />
                )}
              </div>
            </Button>
          </div>

          {/* Right Nav Items */}
          <div className="flex justify-around flex-1">
            {rightNavItems.map((item) => {
              const isActive = pathname === item.path;
              const IconComponent = item.icon as React.ElementType;
              const isCart = item.label === 'Cart'; // Check if this is the Cart button

              return (
                <motion.button
                  key={item.path}
                  onClick={() => navigate({ to: item.path })}
                  className={`relative flex flex-col items-center justify-center text-sm transition-colors ${isActive ? "text-base-primary" : "text-muted-foreground"}`}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div
                    className="relative w-6 h-6 mb-1.5" // Add relative positioning here
                    animate={{ y: isActive ? -5 : 0 }}
                  >
                    <IconComponent className="w-6 h-6" />
                    {/* 3. Conditionally render the badge */}
                    {isCart && cartItemCount > 0 && (
                      <span className="absolute -top-2 -right-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                        {cartItemCount}
                      </span>
                    )}
                  </motion.div>
                  <h3 className="font-semibold">{item.label}</h3>
                </motion.button>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}

