import ErrorState from "@/components/ErrorState";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategories } from "@/hooks/category/useRestaurantCate";
import { useCategoryStore } from "@/store/CategoryStore";


export default function CategoryFilters() {
  const type = "thing-to-do";
    const { activeCategory, setActiveCategory } = useCategoryStore();
    const { data, isLoading, isError } = useCategories(type);
    const categories = [{ id: null, name: "All" }, ...(data?.data || [])];

  return (
    <section className="px-4">
      <h2 className="mb-4 text-lg font-bold text-card-foreground">Categories</h2>
     <div className="flex items-center gap-2 pb-2 overflow-x-auto scrollbar-hide">
        {isLoading ? (
          [...Array(5)].map((_, index) => (
            <Skeleton className="w-20 h-8 rounded-full" key={index} />
          ))
        ) : isError ? (
          <ErrorState />
        ) : (
          categories.map((category) => (
            <Button
              key={category.id ?? "all"}
              variant={activeCategory === category.id ? "default" : "outline"}
              className={`rounded-full border-none transition-all duration-300 h-8 ${
                activeCategory === category.id
                  ? "bg-base-primary text-card"
                  : "bg-base-input"
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </Button>
          ))
        )}
      </div>
    </section>
  );
}
