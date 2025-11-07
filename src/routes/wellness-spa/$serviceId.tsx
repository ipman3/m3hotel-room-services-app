import { CarouselComponent } from "@/components/CarouselComponent";
import HeaderComponent from "@/components/layout/HeaderComponent";
import ServiceDetailSheet from "@/components/Pages/WellnessAndSpa/ServiceDetailSheet";
import { Skeleton } from "@/components/ui/skeleton";
import { useSpaDetail } from "@/hooks/wellness-spa/useSpaDetail";
import useNavbarStore from "@/store/Navbar";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/wellness-spa/$serviceId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { serviceId } = Route.useParams();
  const { hide, show } = useNavbarStore((state) => state);

  useEffect(() => {
    hide();
    return () => {
      show();
    };
  }, [hide, show]);

  const { data: spaDetail, isLoading } = useSpaDetail(Number(serviceId));
  const serviceData = spaDetail?.data;

  return (
    <div>
      <HeaderComponent title="Selected items" />
      <main className="h-screen bg-background max-w-md mx-auto w-full">
        {isLoading ? (
          <Skeleton className="w-full h-80" />
        ) : (
          <CarouselComponent
            imageUrls={serviceData?.images ? [serviceData?.images[0]] : []}
          />
        )}
        {serviceData && <ServiceDetailSheet service={serviceData} />}
      </main>
    </div>
  );
}
