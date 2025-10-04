import { Card, CardContent } from "@/components/ui/card";
import { serviceItems } from "@/config/data/room-service";
import { usePathId } from "@/hooks/usePathId";
import { useCategoryStore } from "@/store/CategoryStore";
import { Link } from "@tanstack/react-router";

export default function SelectionList() {
  const { activeCategory } = useCategoryStore();

  const filteredItems =
    activeCategory === "All"
      ? serviceItems
      : serviceItems.filter((item) => item.category === activeCategory);

  const roomId = usePathId('/room-service/');

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
        {filteredItems.slice(0, 5).map((item) => (
          <Link
            key={item.id}
            to="/room-service/$serviceId"
            params={{ serviceId: item.id }}
          >
            <Card className="py-4 mb-4 overflow-hidden border-none customShadowSm rounded-xl">
              <CardContent className="flex items-center gap-4 px-4">
                <img
                  src={item.imageUrl}
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
        ))}
      </div>
    </section>
  );
}
