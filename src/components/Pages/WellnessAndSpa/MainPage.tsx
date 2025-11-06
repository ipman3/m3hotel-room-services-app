import { useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import OffersCarousel from "../HomePage/OffersCarousel";
import CategoryFilters from "./CategoryFilters";
import PopularSpaSection from "./PopularSpaSection";
import SelectionList from "./SelectionList";
import FilterSheet from "@/components/FilterSheetCom";
import { Icons } from "../../../../public/assets/icons";
import { useNavigate } from "@tanstack/react-router";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import post from "@sfutureapps/req-sdk";
import { useQuery } from "@tanstack/react-query";

export default function MainPage() {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState<string[]>(["Spa"]);

  const { data: filterCategories } = useQuery({
    queryKey: ["spa", "getCategoryByType"],
    queryFn: async () =>
      await post({
        endpoint: "products/getCategoryByType",
        data: { type: "spa" },
      }),
  });

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 40]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) => (prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]));
  };

  const handleApplyFilters = () => {
    console.log("Applying filters:", { selectedCategories, priceRange });
    setIsFilterOpen(false);
  };

  const handleNavigateToSearch = () => {
    navigate({ to: "/wellness-spa/search" });
  };

  // console.log(filterCategories);

  return (
    <main className="pt-6 mt-14">
      <div className="relative w-full px-4 mb-4">
        <div onClick={handleNavigateToSearch}>
          <Search className="absolute w-5 h-5 text-gray-300 -translate-y-1/2 left-8 top-1/2" />
          <Input placeholder="Search..." className="w-full h-12 text-base rounded-full pl-11" readOnly />
        </div>
        <Drawer open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <DrawerTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute text-orange-500 -translate-y-1/2 rounded-full right-6 top-1/2 hover:bg-orange-100 hover:text-orange-500">
              <img src={Icons.filterIcon} alt="Filter icon" className="w-5 h-5" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="w-full max-w-md mx-auto bg-muted-background">
            <DialogTitle className="pt-4 text-center">Filter Options</DialogTitle>
            <DialogDescription className="mb-4 text-sm text-center text-muted-foreground">
              Use the filters below to refine your search results.
            </DialogDescription>
            <FilterSheet
              categories={filterCategories?.data}
              selectedCategories={selectedCategories}
              onCategoryToggle={handleCategoryToggle}
              priceRange={priceRange}
              onPriceChange={(value) => setPriceRange(value as [number, number])}
              onApply={handleApplyFilters}
              minPrice={10}
              maxPrice={50}
            />
          </DrawerContent>
        </Drawer>
      </div>

      <div className="space-y-6">
        <div className="mb-4">
          <OffersCarousel />
        </div>

        <CategoryFilters />
        <PopularSpaSection />
        <SelectionList />
      </div>
    </main>
  );
}
