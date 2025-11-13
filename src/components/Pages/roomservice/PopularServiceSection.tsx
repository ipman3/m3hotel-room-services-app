import { Card, CardContent } from "@/components/ui/card";
import { usePathId } from "@/hooks/usePathId";
import { Link, useNavigate } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/CartStore";
import { cartFabRef } from "@/lib/cartFabRef";
import { containerVariants, itemVariants } from "@/lib/variantsAnimation";
import { useFlyToCartStore } from "@/store/FlyToCartStore";
import { usePopularFoods } from "@/hooks/room-service/usePopularFoods";
import { toast } from "sonner";
import SkeletonHorizontalLoader from "@/components/SkeletonHorizentalLoader";
import ErrorState from "@/components/ErrorState";
import { useCategoryStore } from "@/store/CategoryStore";

export default function PopularServiceSection() {
  const serviceType = "restautant";
  const navigate = useNavigate();
  const { data: popularFoods, isLoading, isError } = usePopularFoods();
  const addItem = useCartStore((state) => state.addItem);
  const { activeCategory } = useCategoryStore();
  const popularProducts = popularFoods?.data || [];
  const roomId = usePathId("/room-service/");

  const filteredPopular = activeCategory === null ? popularProducts : popularProducts.filter((item: any) => item.category_id === activeCategory);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
    const item = popularProducts.find((i: any) => i.id === parseInt(id));
    if (!item) return;

    console.log(item);
    // console.log(id);

    // return;

    const card = (e.currentTarget.closest(".card-container") as HTMLElement)!;
    const rect = card.getBoundingClientRect();

    useFlyToCartStore.getState().startFly({
      rect,
      image: item.photothumb,
      name: item.name,
      price: item.price,
    });

    const newItem = {
      serviceType: serviceType,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.photothumb,
      description: item.description,
      message: "",
      discount: item.discount,
      category: item.category_id,
      id: item.id.toString(),
    };
    addItem(newItem);

    toast.success("Item added to cart!", {
      duration: 3000,
      action: { label: "View Cart", onClick: () => navigate({ to: "/cart" }) },
      id: "add-to-cart-success",
    });
  };

  return (
    <section className="relative">
      <div className="flex items-center justify-between px-4 mb-2">
        <h2 className="text-lg font-bold text-card-foreground">Most popular dishes</h2>
        <Link to="/view-all/$roomId" params={{ roomId }}>
          <span className="text-sm font-semibold cursor-pointer text-base-accent">View All</span>
        </Link>
      </div>

      <motion.div
        className="flex gap-4 pb-3 pr-4 ml-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        variants={containerVariants}
        initial="hidden"
        animate="visible">
        {isLoading ? (
          [...Array(5)].map((_, index) => <SkeletonHorizontalLoader key={index} />)
        ) : isError ? (
          <ErrorState />
        ) : (
          filteredPopular?.map((item: any) => (
            <motion.div key={item.id} variants={itemVariants}>
              <div className="relative snap-start card-container">
                <Link to="/room-service/$serviceId" params={{ serviceId: item.id.toString() }}>
                  <Card className="flex-shrink-0 w-40 p-0 border-none customShadowSm rounded-xl">
                    <CardContent className="p-0">
                      <img src={item.photothumb} alt={item.name} className="object-cover w-full h-24 rounded-t-xl" loading="lazy" />
                      <div className="px-2 py-4">
                        <h3 className="font-semibold truncate">{item.name}</h3>
                        <p className="text-sm font-bold text-gray-800">${parseFloat(item.price).toFixed(2)}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Button
                  ref={cartFabRef}
                  size="icon"
                  onClick={(e) => handleAddToCart(e, item.id.toString())}
                  className="absolute flex items-center justify-center w-6 h-6 p-0 text-white border-none rounded-full shadow-none cursor-pointer bottom-3 right-3 bg-base-primary">
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
