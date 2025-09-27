import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import OffersCarousel from "../HomePage/OffersCarousel";
import CategoryFilters from "./CategoryFilters";
import PopularSpaSection from "./PopularSpaSection";
import SelectionList from "./SelectionList";
import { Icons } from "../../../../public/assets/icons";

const MainPage = () => {
  return (
    <main className="pt-6 mt-14">
      <div className="relative w-full px-4 mb-4">
        <Search className="absolute w-5 h-5 text-gray-300 -translate-y-1/2 left-8 top-1/2" />
        <Input
          placeholder="Search..."
          className="w-full h-12 text-base bg-white border border-gray-200 rounded-full pl-11"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute text-orange-500 -translate-y-1/2 rounded-full right-6 top-1/2 hover:bg-orange-100 hover:text-orange-500"
        >
          <img src={Icons.filterIcon} alt="Filter icon" className="w-5 h-5" />
        </Button>
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
};

export default MainPage;
