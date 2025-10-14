import HomeHeader from "@/components/Pages/HomePage/HomeHeader";
import OffersCarousel from "@/components/Pages/HomePage/OffersCarousel";
import ServiceGrid from "@/components/Pages/HomePage/ServiceGrid";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
<<<<<<< HEAD
    <div className="flex flex-col justify-center w-full max-w-md mx-auto bg-muted-background">
=======
    <div className="flex flex-col justify-center w-full max-w-md min-h-screen mx-auto">
>>>>>>> origin/Bunheng-Dev
      <HomeHeader />
      <div className="pt-6 space-y-6">
        <ServiceGrid />
        <OffersCarousel />
      </div>

      <div className="pb-8" />
    </div>
  );
}
