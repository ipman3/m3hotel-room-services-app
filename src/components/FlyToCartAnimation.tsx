import { motion, AnimatePresence } from "framer-motion";
import { useFlyToCartStore } from "@/store/FlyToCartStore";
import { cartFabRef } from "@/lib/cartFabRef";
import { CardContent } from "./ui/card";

export function FlyToCartAnimation() {
  const { flyingCard, stopFly } = useFlyToCartStore();
  const cartRect = cartFabRef.current?.getBoundingClientRect();
  const targetTop = cartRect ? cartRect.bottom : window.innerHeight - 40;
  const targetLeft = cartRect ? cartRect.right : window.innerWidth - 40;

  return (
    <AnimatePresence>
      {flyingCard && (
        <motion.div
          initial={{
            position: "fixed",
            top: flyingCard.rect.top,
            left: flyingCard.rect.left,
            width: flyingCard.rect.width,
            height: flyingCard.rect.height,
            zIndex: 9999,
          }}
          animate={{
            top: targetTop,
            left: targetLeft,
            width: 40,
            height: 40,
            opacity: 0,
            transition: { duration: 0.8, ease: [0.45, 0, 0.55, 1] },
            scale: [1, 0.9, 0.5],
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          exit={{ opacity: 0 }}
          onAnimationComplete={stopFly}
        >
          <CardContent className="p-0 overflow-hidden bg-white shadow-lg rounded-xl">
            <img
              src={flyingCard.image}
              alt={flyingCard.name}
              className="object-cover w-full h-24"
            />
            <div className="px-2 py-4">
              <h3 className="font-semibold truncate">{flyingCard.name}</h3>
              <p className="text-sm font-bold text-gray-800">
                ${flyingCard.price.toFixed(2)}
              </p>
            </div>
          </CardContent>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
