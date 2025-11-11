import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Search } from "lucide-react";

interface Category {
  id: number;
  store_id: number;
  name: string;
  weigh: number;
  status: string;
  createtime: number;
  updatetime: number;
  service_type: string;
  parent_id: number;
}

interface FilterSheetProps {
<<<<<<< HEAD
  categories: any[];
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
=======
  categories: Category[];
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  selectedCategoryId: number | null; 
  onCategorySelect: (categoryId: number) => void;
>>>>>>> origin/Bunheng-Dev
  priceRange: [number, number];
  onPriceChange: (value: number[]) => void;
  onApply: () => void;
  maxPrice?: number;
  minPrice?: number;
}

export default function FilterSheet({
  categories,
  searchQuery,
  onSearchQueryChange,
  selectedCategoryId,
  onCategorySelect,
  priceRange,
  onPriceChange,
  onApply,
  maxPrice = 100,
  minPrice = 0,
}: FilterSheetProps) {
  return (
    <div className="p-4 pt-2">
      <div className="relative w-full mb-6">
        <Search className="absolute w-5 h-5 text-gray-300 -translate-y-1/2 left-4 top-1/2" />
<<<<<<< HEAD
        <Input placeholder="Search..." className="w-full h-12 text-base rounded-full pl-11" />
=======
        <Input
          placeholder="Search..."
          className="w-full h-12 text-base rounded-full pl-11"
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
        />
>>>>>>> origin/Bunheng-Dev
      </div>

      <div className="mb-6">
        <h3 className="mb-3 font-semibold">Select Category</h3>
        <div className="flex flex-wrap gap-2">
<<<<<<< HEAD
          {categories &&
            categories?.map((cat, index) => (
              <Button
                key={`${cat?.id}-${index}`}
                variant={selectedCategories == cat?.id ? "default" : "outline"}
                className={`rounded-lg transition-colors border-none duration-300 ${
                  selectedCategories == cat?.id ? "bg-base-primary text-white border-transparent" : "bg-base-input text-gray-700"
                }`}
                onClick={() => onCategoryToggle(cat)}>
                {cat?.name}
              </Button>
            ))}
=======
          {categories.map((cat, index) => (
            <Button
              key={`${cat}-${index}`}
              variant={selectedCategoryId === cat.id ? "default" : "outline"}
              className={`rounded-lg transition-colors border-none duration-300 ${
                selectedCategoryId === cat.id
                  ? "bg-base-primary text-white border-transparent"
                  : "bg-base-input text-gray-700"
              }`}
              onClick={() => onCategorySelect(cat.id)}
            >
              {cat.name}
            </Button>
          ))}
>>>>>>> origin/Bunheng-Dev
        </div>
      </div>

      <div className="mb-8">
        <h3 className="mb-3 font-semibold">Price Range</h3>
        <Slider value={priceRange} max={maxPrice} min={minPrice} step={1} onValueChange={(value) => onPriceChange(value)} className="my-6" />
        <div className="flex justify-between -mt-2 text-sm text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

<<<<<<< HEAD
      <Button size="lg" className="w-full rounded-full h-14 bg-base-primary" onClick={onApply}>
=======
      <Button
        size="lg"
        className="w-full rounded-full h-12 bg-base-primary"
        onClick={onApply}
        disabled={selectedCategoryId === null}
      >
>>>>>>> origin/Bunheng-Dev
        Apply
      </Button>
    </div>
  );
}
