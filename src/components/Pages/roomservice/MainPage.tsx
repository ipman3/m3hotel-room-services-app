"use client";

import { useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Icons } from "../../../../public/assets/icons";
import CategoryFilters from "./CategoryFilters";
import SelectionList from "./SelectionList";
import ServicesCarousel from "./ServicesCarousel";
import PopularServiceSection from "./PopularServiceSection";
import { useNavigate } from "@tanstack/react-router";
import FilterSheet from "@/components/FilterSheetCom";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";

const filterCategories = [
  "Pizza",
  "Burger",
  "Salad",
  "Soup",
  "Chicken",
  "Grill",
  "Breakfast",
];

const MainPage = () => {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([10, 100]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleApplyFilters = () => {
    console.log("Applying filters:", { selectedCategories, priceRange });
    setIsFilterOpen(false);
  };

  const handleNavigateToSearch = () => {
    navigate({ to: "/room-service/search" });
  };

  return (
    <main className="pt-6 mt-14">
      {/* ===== Search Bar + Filter Button ===== */}
      <div className="relative w-full mb-4 px-4">
        <div onClick={handleNavigateToSearch}>
          <Search className="absolute w-5 h-5 text-gray-300 -translate-y-1/2 left-8 top-1/2" />
          <Input
            placeholder="Search..."
            className="w-full h-12 text-base bg-white border border-gray-200 rounded-full pl-11"
            readOnly
          />
        </div>

        {/* ===== Filter Drawer ===== */}
        <Drawer open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <DrawerTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute text-orange-500 -translate-y-1/2 rounded-full right-6 top-1/2 hover:bg-orange-100 hover:text-orange-500"
            >
              <img
                src={Icons.filterIcon}
                alt="Filter icon"
                className="w-5 h-5"
              />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="bg-muted-background w-full max-w-md mx-auto">
            <DialogTitle className="pt-4 text-center">
              Filter Options
            </DialogTitle>
            <DialogDescription className="mb-4 text-sm text-center text-muted-foreground">
              Use the filters below to refine your search results.
            </DialogDescription>
            <FilterSheet
              categories={filterCategories}
              selectedCategories={selectedCategories}
              onCategoryToggle={handleCategoryToggle}
              priceRange={priceRange}
              onPriceChange={(value) =>
                setPriceRange(value as [number, number])
              }
              onApply={handleApplyFilters}
              minPrice={10}
              maxPrice={100}
            />
          </DrawerContent>
        </Drawer>
      </div>

      {/* ===== Main Content Sections ===== */}
      <div className="space-y-6">
        <div className="mb-4">
          <ServicesCarousel />
        </div>

        <CategoryFilters />
        <PopularServiceSection />
        <SelectionList />
      </div>
    </main>
  );
};

export default MainPage;
