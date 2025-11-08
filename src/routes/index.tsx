import HomeHeader from "@/components/Pages/HomePage/HomeHeader";
import OffersCarousel from "@/components/Pages/HomePage/OffersCarousel";
import ServiceGrid from "@/components/Pages/HomePage/ServiceGrid";
import { useSearchStore } from "@/store/useSearchStore";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const { clearSearchResults } = useSearchStore();

  useEffect(() => {
    clearSearchResults();
  }, [clearSearchResults]);

  return (
    <div className="flex flex-col justify-center w-full max-w-md mx-auto">
      <HomeHeader />
      <div className="pt-6 space-y-6">
        <ServiceGrid />
        <OffersCarousel />
      </div>

      <div className="pb-8" />
    </div>
  );
}
