// src/components/layout/FloatingCartButton.tsx

import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/CartStore";
import useNavbarStore from "@/store/Navbar";

export function FloatingCartButton() {
  const navigate = useNavigate();

  const cartItemCount = useCartStore((state) => state.items.length);

  const { isVisible: isBottomNavVisible } = useNavbarStore((state) => state);

  if (isBottomNavVisible || cartItemCount === 0) {
    return null;
  }

  return (
    <motion.button
      onClick={() => navigate({ to: "/cart" })}
      className="fixed z-50 flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-base-primary text-card bottom-4 left-4"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="View cart"
    >
      <ShoppingCart className="w-6 h-6" />
      <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-1 -left-1">
        {cartItemCount}
      </span>
    </motion.button>
  );
}