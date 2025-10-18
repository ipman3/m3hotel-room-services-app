import { Card, CardContent } from "@/components/ui/card";
import { serviceItems } from "@/config/data/room-service";
import { usePathId } from "@/hooks/usePathId";
import { useCategoryStore } from "@/store/CategoryStore";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PopularServiceSection() {
  const { activeCategory } = useCategoryStore();
  const [addedItems, setAddedItems] = useState<string[]>([]);

  const filteredPopular =
    activeCategory === "All"
      ? serviceItems.filter((i) => i.isPopular)
      : serviceItems.filter((i) => i.isPopular && i.category === activeCategory);

  const roomId = usePathId("/room-service/");

  const handleToggle = (id: string) => {
    setAddedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
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

      <div className="flex gap-4 px-4 pb-3 ml-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
        {filteredPopular.slice(0, 3).map((item) => {
          const isAdded = addedItems.includes(item.id);

          return (
            <div key={item.id} className="relative snap-start">
              <Link
                to="/room-service/$serviceId"
                params={{ serviceId: item.id }}
              >
                <Card className="flex-shrink-0 w-40 p-0 border-none customShadowSm rounded-xl">
                  <CardContent className="p-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-full h-24 rounded-t-xl"
                      loading="lazy"
                    />
                    <div className="px-2 py-4">
                      <h3 className="font-semibold truncate">{item.name}</h3>
                      <p className="text-sm font-bold text-gray-800">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                {/* Add/Check button (no hover) */}
                <Button
                  size="icon"
                  onClick={() => handleToggle(item.id)}
                  className={`absolute bottom-3 right-3 cursor-pointer w-[21px] h-[21px] flex items-center justify-center text-white p-0 border-none shadow-none transition-all duration-300
                ${isAdded
                      ? "bg-[#FF4B4B] rounded-full"
                      : "bg-[#6F5D29] rounded-md"
                    }`}
                >
                  {isAdded ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : (
                    <Plus className="w-4 h-4 text-white" />
                  )}
                </Button>
              </Link>


            </div>
          );
        })}
      </div>
    </section>
  );
}
