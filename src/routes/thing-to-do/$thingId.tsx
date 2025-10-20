import { CarouselComponent } from "@/components/CarouselComponent";
import HeaderComponent from "@/components/layout/HeaderComponent";
import ServiceDetailSheet from "@/components/Pages/thing-to-do/ServiceDetailSheet";
import { thingItems } from "@/config/data/thing-to-do";

import useNavbarStore from "@/store/Navbar";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/thing-to-do/$thingId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { thingId } = Route.useParams();
  const { hide, show } = useNavbarStore((state) => state);

  const serviceData =
    thingItems.find((item) => item.id === thingId) || thingItems[0];

  useEffect(() => {
    hide();
    return () => {
      show();
    };
  }, [hide, show]);

  return (
    <div>
      <HeaderComponent title="Selected items" />
      <main className="h-screen bg-background max-w-md mx-auto w-full">
        <CarouselComponent imageUrls={serviceData.imageUrls || []} />

        <ServiceDetailSheet service={serviceData} />
      </main>
    </div>
  );
}
