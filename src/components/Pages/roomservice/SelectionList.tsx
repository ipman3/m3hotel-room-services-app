"use client";
import { Card, CardContent } from "@/components/ui/card";
import { serviceItems } from "@/config/data/room-service";
import { usePathId } from "@/hooks/usePathId";
import { useCategoryStore } from "@/store/CategoryStore";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Plus, Check } from "lucide-react";
import { useState } from "react";

export default function SelectionList() {
  const { activeCategory } = useCategoryStore();
  const [addedItems, setAddedItems] = useState<string[]>([]); // ✅ type-safe

  const filteredItems =
    activeCategory === "All"
      ? serviceItems
      : serviceItems.filter((item) => item.category === activeCategory);

  const roomId = usePathId("/room-service/");

  const handleToggle = (id: string) => {
    setAddedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
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

      <div>
        {filteredItems.slice(0, 5).map((item) => {
          const isAdded = addedItems.includes(item.id);

          return (
            <div key={item.id} className="relative">
              <Link
                to="/room-service/$serviceId"
                params={{ serviceId: item.id }}
              >
                <Card className="py-4 mb-4 overflow-hidden border-none customShadowSm rounded-xl">
                  <CardContent className="flex items-center gap-4 px-4 relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-24 h-24 rounded-xl"
                      loading="lazy"
                    />
                    <div className="flex-grow">
                      <h3 className="font-bold">{item.name}</h3>
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

              {/* ✅ Add / Check toggle button */}
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
            </div>
          );
        })}
      </div>
    </section>
  );
}
