/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import post from "@/lib/Api";
import { useCategoryStore } from "@/store/CategoryStore";
import { useQuery } from "@tanstack/react-query";

export default function CategoryFilters() {
  const { activeCategory, setActiveCategory } = useCategoryStore();

  const { data: categories } = useQuery({
    queryKey: ["categories", "spa"],
    queryFn: async () =>
      await post({
        endpoint: "/products/getCategoryByType",
        data: { type: "spa" },
      }),
  });

  return (
    <section className="px-4">
      <h2 className="mb-4 text-lg font-bold text-card-foreground">Categories</h2>
      <div className="flex items-center gap-2 pb-2 overflow-x-auto">
        <Button
          key={0}
          variant={activeCategory === "All" ? "default" : "outline"}
          className={`rounded-full border-none transition-all duration-300 ${activeCategory === "All" ? "bg-base-primary text-card" : "bg-base-input"}`}
          onClick={() => setActiveCategory("All")}>
          All
        </Button>
        {categories?.data?.map((category: any) => (
          <Button
            key={category?.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            className={`rounded-full border-none transition-all duration-300 ${activeCategory === category.id ? "bg-base-primary text-card" : "bg-base-input"}`}
            onClick={() => setActiveCategory(category.id)}>
            {category?.name}
          </Button>
        ))}
      </div>
    </section>
  );
}
