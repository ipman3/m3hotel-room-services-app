import { Card, CardContent } from "@/components/ui/card";
import { serviceItems } from "@/config/data/room-service";
import { usePathId } from "@/hooks/usePathId";
import { useCategoryStore } from "@/store/CategoryStore";
import { Link, useNavigate } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { containerVariants, itemVariants } from "@/lib/variantsAnimation";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/CartStore";
import { toast } from "sonner";

export default function PopularServiceSection() {
  const { activeCategory } = useCategoryStore();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);

  const filteredPopular =
    activeCategory === "All"
      ? serviceItems.filter((i) => i.isPopular)
      : serviceItems.filter(
          (i) => i.isPopular && i.category === activeCategory
        );

  const roomId = usePathId("/room-service/");

  const handleAddToCart = (id: string) => {
    const item = filteredPopular.find((i) => i.id === id);
    if (!item) return;

    const newItem = {
      serviceName: item.serviceName,
      price: item.price,
      quantity: 1,
      imageUrl: item.imageUrl,
      description: item.description,
      category: item.category,
      serviceTypeId: item.serviceTypeId,
      serviceType: item.serviceType,
      message: "",
    };
    addItem(newItem);

    toast.success("Item added to cart!", {
      duration: 8000,
      action: { label: "View Cart", onClick: () => navigate({ to: "/cart" }) },
    });
  };

  return (
    <section>
      <div className="flex items-center justify-between px-4 mb-2">
        <h2 className="text-lg font-bold text-card-foreground">
          Most popular dishes
        </h2>
        <Link
          to="/view-all/$roomId"
          params={{ roomId }}
          search={{ popular: "true" }}
        >
          <span className="text-sm font-semibold cursor-pointer text-base-accent">
            View All
          </span>
        </Link>
      </div>

      <motion.div
        className="flex gap-4 pb-3 pr-4 ml-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredPopular.slice(0, 3).map((item) => {
          return (
            <motion.div key={item.id} variants={itemVariants}>
              <div className="relative snap-start">
                <Link
                  to="/room-service/$serviceId"
                  params={{ serviceId: item.id }}
                >
                  <Card className="flex-shrink-0 w-40 p-0 border-none customShadowSm rounded-xl">
                    <CardContent className="p-0">
                      <img
                        src={item.imageUrl}
                        alt={item.serviceName}
                        className="object-cover w-full h-24 rounded-t-xl"
                        loading="lazy"
                      />
                      <div className="px-2 py-4">
                        <h3 className="font-semibold truncate">
                          {item.serviceName}
                        </h3>
                        <p className="text-sm font-bold text-gray-800">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
                <Button
                  size="icon"
                  onClick={() => handleAddToCart(item.id)}
                  className={`absolute bottom-3 right-3 cursor-pointer w-6 h-6 flex items-center justify-center text-white p-0 border-none shadow-none transition-all duration-300 bg-base-primary rounded-full`}
                >
                  <Plus className="w-4 h-4 text-white" />
                </Button>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
