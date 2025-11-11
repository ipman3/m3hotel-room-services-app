"use client";

import { useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Icons } from "../../../../public/assets/icons";
import CategoryFilters from "./CategoryFilters";
import SelectionList from "./SelectionList";
import PopularServiceSection from "./PopularServiceSection";
import { useNavigate } from "@tanstack/react-router";
import FilterSheet from "@/components/FilterSheetCom";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import OffersCarouselRoomService from "./Offer/OffersCarousel";
import { useCategories } from "@/hooks/category/useRestaurantCate";
import { useSearchStore, type SearchResult } from "@/store/useSearchStore";
import { useRoomServiceSearchMutation } from "@/hooks/room-service/useFilterRoomService";
import { toast } from "sonner";

const MainPage = () => {
  const navigate = useNavigate();
  const type = "restautant";
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterSearch, setFilterSearch] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([1, 10]);

  const { data: filterCategories } = useCategories(type);
  const categories = filterCategories?.data || [];

  const { setSearchResults, setLoading, setError, clearSearchResults } = useSearchStore();
  const searchMutation = useRoomServiceSearchMutation();

  const handleApplyFilters = () => {
    if (!selectedCategoryId) {
      toast.error("Please select a category.");
      return;
    }

    const variables = {
      q: filterSearch,
      category: selectedCategoryId,
      price: `${priceRange[0]}-${priceRange[1]}`,
    };

    setLoading(true);
    setError(null);

    searchMutation.mutate(variables, {
      onSuccess: (data) => {
        if (data.code === 1 && Array.isArray(data.data)) {
          setSearchResults(data.data as SearchResult[]);
          navigate({ to: "/room-service/search" });
        } else {
          setError(data.msg || "Search failed");
          console.error("Search failed:", data.msg);
        }
      },
      onError: (error) => {
        setError(
          (error as Error).message || "An unknown network error occurred"
        );
        console.error("Error searching spa:", error);
      },
      onSettled: () => {
        setLoading(false);
        setIsFilterOpen(false);
      },
    });
  };

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
  };

  const handleNavigateToSearch = () => {
    clearSearchResults();
    navigate({ to: "/room-service/search" });
  };

  return (
    <main className="pt-6 mt-14">
      {/* Search Bar + Filter Button */}
      <div className="relative w-full px-4 mb-4">
        <div onClick={handleNavigateToSearch}>
          <Search className="absolute w-5 h-5 text-gray-300 -translate-y-1/2 left-8 top-1/2" />
          <Input
            placeholder="Search..."
            className="w-full h-12 text-base rounded-full pl-11"
            readOnly
          />
        </div>

        {/* Filter Drawer */}
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
          <DrawerContent className="w-full max-w-md mx-auto bg-muted-background">
            <DialogTitle className="pt-4 text-center">
              Filter Options
            </DialogTitle>
            <DialogDescription className="mb-4 text-sm text-center text-muted-foreground">
              Use the filters below to refine your search results.
            </DialogDescription>
            <FilterSheet
              categories={categories}
              searchQuery={filterSearch}
              onSearchQueryChange={setFilterSearch}
              selectedCategoryId={selectedCategoryId}
              onCategorySelect={handleCategorySelect}
              priceRange={priceRange}
              onPriceChange={(value) =>
                setPriceRange(value as [number, number])
              }
              onApply={handleApplyFilters}
              minPrice={1}
              maxPrice={100}
            />
          </DrawerContent>
        </Drawer>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-6">
        <div className="mb-4">
          <OffersCarouselRoomService />
        </div>

        <CategoryFilters />
        <PopularServiceSection />
        <SelectionList />
      </div>
    </main>
  );
};

export default MainPage;
