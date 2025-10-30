import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategories } from "@/hooks/category/useRestaurantCate";
import { useCategoryStore } from "@/store/CategoryStore";

export default function CategoryFilters() {
  const type = "restautant";
  const { activeCategory, setActiveCategory } = useCategoryStore();
  const { data, isLoading, isError } = useCategories(type);
  const categories = ["All", ...(data?.data?.map((cat) => cat.name) || [])];

  return (
    <section className="px-4">
      <h2 className="mb-2 text-lg font-bold text-card-foreground">
        Categories
      </h2>
      <div className="flex items-center gap-2 pb-2 overflow-x-auto scrollbar-hide">
        {isLoading ? (
          [...Array(5)].map((_, index) => (
            <Skeleton className="h-8 w-20 rounded-full" key={index} />
          ))
        ) : isError ? (
          <p>Something went wrong</p>
        ) : (
          categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              className={`rounded-full border-none transition-all duration-300 h-8 ${
                activeCategory === category
                  ? "bg-base-primary text-card"
                  : "bg-base-input"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))
        )}
      </div>
    </section>
  );
}
