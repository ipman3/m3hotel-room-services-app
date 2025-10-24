import { Button } from "@/components/ui/button";
import { useCategoryStore } from "@/store/CategoryStore";

const categories = ["All", "Full Day Tour", "Half Day Tour"];

export default function CategoryFilters() {
  const { activeCategory, setActiveCategory } = useCategoryStore();

  return (
    <section className="px-4">
      <h2 className="mb-2 text-lg font-bold text-card-foreground">Categories</h2>
      <div className="flex items-center gap-2 pb-2 overflow-x-auto">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            className={`rounded-full border-none transition-all duration-300 ${activeCategory === category
              ? "bg-base-primary text-card"
              : "bg-base-input"
              }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
    </section>
  );
}
