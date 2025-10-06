import { Card, CardContent } from "@/components/ui/card";
import { thingItems } from "@/config/data/thing-to-do";
import { usePathId } from "@/hooks/usePathId";
import { useCategoryStore } from "@/store/CategoryStore";
import { Link } from "@tanstack/react-router";

export default function PopularThingSection() {
  const { activeCategory } = useCategoryStore();

  const filteredPopular =
    activeCategory === "All"
      ? thingItems.filter((i) => i.isPopular)
      : thingItems.filter((i) => i.isPopular && i.category === activeCategory);

  const thingId = usePathId("/thing-to-do/");

  return (
    <section>
      <div className="flex items-center justify-between px-4 mb-2">
        <h2 className="text-lg font-bold text-card-foreground">
          Most Popular Tours
        </h2>
        <Link
          to="/view-all/$thingId"
          params={{ thingId }}
          search={{ popular: "true" }}
        >
          <span className="text-sm font-semibold cursor-pointer text-base-accent">
            View All
          </span>
        </Link>
      </div>

      <div className="flex gap-4 px-4 pb-3 ml-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
        {filteredPopular.slice(0, 3).map((item) => (
          <Link
            key={item.id}
            to="/room-service/$serviceId"
            params={{ serviceId: item.id }}
            className="snap-start"
          >
            <Card className="flex-shrink-0 w-40 p-0 border-none customShadowSm rounded-xl">
              <CardContent className="p-0">
                <img
                  src={item.imageUrl}
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
          </Link>
        ))}
      </div>
    </section>
  );
}
