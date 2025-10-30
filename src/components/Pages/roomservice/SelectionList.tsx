"use client";

import { Card, CardContent } from "@/components/ui/card";
import { usePathId } from "@/hooks/usePathId";
import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/variantsAnimation";
import { useCartStore } from "@/store/CartStore";
import { toast } from "sonner";
import { useFlyToCartStore } from "@/store/FlyToCartStore";
import { useTopSelectionFoods } from "@/hooks/room-service/useTopSelectionFoods";
import SkeletonVerticalLoader from "@/components/SkeletonVerticalLoader";
import ErrorState from "@/components/ErrorState";
import { useCategoryStore } from "@/store/CategoryStore";

export default function SelectionList() {
  const serviceType = "room-service";
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const { activeCategory } = useCategoryStore();
  const {
    data: topSelectionFoods,
    isLoading,
    isError,
  } = useTopSelectionFoods();
  const topSelectionProducts = topSelectionFoods?.data || [];
  const roomId = usePathId("/room-service/");

  const filteredPopular =
    activeCategory === null
      ? topSelectionProducts
      : topSelectionProducts.filter((item) => item.category_id === activeCategory);


  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    const item = topSelectionProducts.find((i) => i.id === parseInt(id));
    if (!item) return;

    const card = e.currentTarget.closest(".card-container") as HTMLElement;
    const rect = card.getBoundingClientRect();

    useFlyToCartStore.getState().startFly({
      rect,
      image: item.photothumb,
      name: item.name,
      price: item.price,
    });

    addItem({
      serviceType: serviceType,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.photothumb,
      description: item.description,
      category_id: item.category_id,
      message: "",
    });

    toast.success("Item added to cart!", {
      duration: 3000,
      action: { label: "View Cart", onClick: () => navigate({ to: "/cart" }) },
    });
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

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {isLoading ? (
          [...Array(8)].map((_, index) => (
            <SkeletonVerticalLoader key={index} />
          ))
        ) : isError ? (
          <ErrorState />
        ) : (
          filteredPopular.slice(0, 12).map((item) => (
            <motion.div key={item.id} variants={itemVariants}>
              <div className="relative card-container">
                <Link
                  to="/room-service/$serviceId"
                  params={{ serviceId: item.id.toString() }}
                >
                  <Card className="py-2 mb-4 overflow-hidden border-none customShadowSm rounded-xl">
                    <CardContent className="relative flex items-center gap-4 px-2">
                      <img
                        src={item.photothumb}
                        alt={item.name}
                        className="object-cover w-24 h-24 rounded-xl"
                        loading="lazy"
                      />
                      <div className="flex-grow">
                        <h3 className="font-bold">{item.name}</h3>
                        <p className="!text-sm line-clamp-2 text-muted-foreground" dangerouslySetInnerHTML={{__html: item.description}} />
                        <p className="mt-1 font-bold">
                          ${parseFloat(item.price).toFixed(2)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Button
                  size="icon"
                  onClick={(e) => handleAddToCart(e, item.id.toString())}
                  className="absolute flex items-center justify-center w-6 h-6 p-0 text-white border-none rounded-full shadow-none cursor-pointer bottom-3 right-3 bg-base-primary"
                >
                  <Plus className="w-4 h-4 text-white" />
                </Button>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </section>
  );
}
