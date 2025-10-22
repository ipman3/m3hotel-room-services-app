"use client";

import { Card, CardContent } from "@/components/ui/card";
import { serviceItems } from "@/config/data/room-service";
import { usePathId } from "@/hooks/usePathId";
import { useCategoryStore } from "@/store/CategoryStore";
import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/variantsAnimation";
import { useCartStore } from "@/store/CartStore";
import { useState } from "react";
import { toast } from "sonner";
import { cartFabRef } from "@/lib/cartFabRef";

export default function SelectionList() {
  const { activeCategory } = useCategoryStore();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const [flyingCard, setFlyingCard] = useState<{
    rect: DOMRect;
    image: string;
    serviceName: string;
    price: number;
  } | null>(null);

  const filteredItems =
    activeCategory === "All"
      ? serviceItems
      : serviceItems.filter((item) => item.category === activeCategory);

  const roomId = usePathId("/room-service/");

  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    const item = filteredItems.find((i) => i.id === id);
    if (!item) return;

    const card = e.currentTarget.closest(".card-container") as HTMLElement;
    const rect = card.getBoundingClientRect();

    setFlyingCard({
      rect,
      image: item.imageUrl,
      serviceName: item.serviceName,
      price: item.price,
    });

    addItem({
      serviceName: item.serviceName,
      price: item.price,
      quantity: 1,
      imageUrl: item.imageUrl,
      description: item.description,
      category: item.category,
      serviceTypeId: item.serviceTypeId,
      serviceType: item.serviceType,
      message: "",
    });

    toast.success("Item added to cart!", {
      duration: 3000,
      action: { label: "View Cart", onClick: () => navigate({ to: "/cart" }) },
    });

    setTimeout(() => setFlyingCard(null), 800);
  };

  return (
    <section className="px-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold text-card-foreground">Selection</h2>
        <Link to="/view-all/$roomId" params={{ roomId }}>
          <span className="text-sm font-semibold cursor-pointer text-base-accent">
            View All
          </span>
        </Link>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        {filteredItems.slice(0, 5).map((item) => (
          <motion.div key={item.id} variants={itemVariants}>
            <div className="relative card-container">
              <Link to="/room-service/$serviceId" params={{ serviceId: item.id }}>
                <Card className="py-4 mb-4 overflow-hidden border-none customShadowSm rounded-xl">
                  <CardContent className="relative flex items-center gap-4 px-4">
                    <img
                      src={item.imageUrl}
                      alt={item.serviceName}
                      className="object-cover w-24 h-24 rounded-xl"
                      loading="lazy"
                    />
                    <div className="flex-grow">
                      <h3 className="font-bold">{item.serviceName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description.length > 50
                          ? item.description.slice(0, 50) + "..."
                          : item.description}
                      </p>
                      <p className="mt-1 font-bold">${item.price.toFixed(2)}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Button
                size="icon"
                onClick={(e) => handleAddToCart(e, item.id)}
                className="absolute flex items-center justify-center w-6 h-6 p-0 text-white border-none rounded-full shadow-none cursor-pointer bottom-3 right-3 bg-base-primary"
              >
                <Plus className="w-4 h-4 text-white" />
              </Button>
            </div>
          </motion.div>
        ))}
      </motion.div>

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
              top:
                (cartFabRef.current?.getBoundingClientRect().bottom ?? 0) - 40,
              left:
                (cartFabRef.current?.getBoundingClientRect().right ?? 0) - 40,
              width: 40,
              height: 40,
              opacity: 0,
            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
            }}
            exit={{ opacity: 0 }}
          >
            <CardContent className="flex items-center gap-4 p-4 overflow-hidden bg-white shadow-lg rounded-xl">
              <img
                src={flyingCard.image}
                alt={flyingCard.serviceName}
                className="object-cover w-24 h-24 rounded-xl"
              />
              <div>
                <h3 className="font-semibold truncate">
                  {flyingCard.serviceName}
                </h3>
                <p className="text-sm font-bold text-gray-800">
                  ${flyingCard.price.toFixed(2)}
                </p>
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
