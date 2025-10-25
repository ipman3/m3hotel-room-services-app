import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Search } from "lucide-react";

interface FilterSheetProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  priceRange: [number, number];
  onPriceChange: (value: number[]) => void;
  onApply: () => void;
  maxPrice?: number;
  minPrice?: number;
}

export default function FilterSheet({
  categories,
  selectedCategories,
  onCategoryToggle,
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
        <Input
          placeholder="Search..."
          className="w-full h-12 text-base rounded-full pl-11"
        />
      </div>

      <div className="mb-6">
        <h3 className="mb-3 font-semibold">Select Category</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat, index) => (
            <Button
              key={`${cat}-${index}`}
              variant={selectedCategories.includes(cat) ? "default" : "outline"}
              className={`rounded-lg transition-colors border-none duration-300 ${
                selectedCategories.includes(cat)
                  ? "bg-base-primary text-white border-transparent"
                  : "bg-base-input text-gray-700"
              }`}
              onClick={() => onCategoryToggle(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="mb-3 font-semibold">Price Range</h3>
        <Slider
          value={priceRange}
          max={maxPrice}
          min={minPrice}
          step={1}
          onValueChange={(value) => onPriceChange(value)}
          className="my-6"
        />
        <div className="flex justify-between -mt-2 text-sm text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <Button
        size="lg"
        className="w-full rounded-full h-14 bg-base-primary"
        onClick={onApply}
      >
        Apply
      </Button>
    </div>
  );
}
