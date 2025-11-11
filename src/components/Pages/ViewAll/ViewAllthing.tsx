import { Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { useCategoryStore } from "@/store/CategoryStore";
import CategoryFilters from "../thing-to-do/CategoryFilters";
import { useGetAllThings } from "@/hooks/thing-to-do/useGetAllThing";
import SkeletonVerticalLoader from "@/components/SkeletonVerticalLoader";
import ErrorState from "@/components/ErrorState";

export default function ViewAllPage() {
  const { data: allThingItems, isLoading, isError } = useGetAllThings(true);
  const { activeCategory } = useCategoryStore();
  const thingItems = allThingItems?.data || [];

  const filteredThingItems =
    activeCategory === null
      ? thingItems
      : thingItems.filter((item) => item.category_id === activeCategory);

  return (
    <div className="pt-6">
      <CategoryFilters />

      <div className="px-4 pt-6 space-y-4">
        {isLoading ? (
          [...Array(8)].map((_, index) => (
            <SkeletonVerticalLoader key={index} />
          ))
        ) : isError ? (
          <ErrorState />
        ) : (
          filteredThingItems.slice(0, 12).map((item) => (
           
              <Link
                to="/thing-to-do/$thingId"
                params={{ thingId: item.id.toString() }}
              >
                <Card className="py-4 mb-4 overflow-hidden border-none customShadowSm rounded-xl scroll-animate">
                  <CardContent className="flex items-center gap-4 px-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-24 h-24 rounded-xl"
                      loading="lazy"
                    />
                    <div className="flex-grow">
                      <h3 className="font-bold">
                        {item.name.replace("_", " ")}
                      </h3>
                      <p dangerouslySetInnerHTML={{ __html: item.desc }} />
                      <p className="mt-1 font-bold">
                        ${parseFloat(item.price).toFixed(2)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
          ))
        )}
      </div>
    </div>
  );
}
