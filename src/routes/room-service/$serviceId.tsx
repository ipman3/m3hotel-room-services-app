import { CarouselComponent } from "@/components/CarouselComponent";
import HeaderComponent from "@/components/layout/HeaderComponent";
import ServiceDetailSheet from "@/components/Pages/roomservice/ServiceDetailSheet";
import { Skeleton } from "@/components/ui/skeleton";
import { useProductDetail } from "@/hooks/room-service/useProductDetail";
import useNavbarStore from "@/store/Navbar";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/room-service/$serviceId")({
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

  const { data: productDetail, isLoading } = useProductDetail(
    Number(serviceId)
  );

  const serviceData = productDetail?.data;

  return (
    <div>
      <HeaderComponent title="Selected items" />
      <main>
        {isLoading ? (
          <Skeleton className="w-full h-80" />
        ) : (
          <CarouselComponent
            imageUrls={serviceData?.photo ? [serviceData.photo] : []}
          />
        )}

        {serviceData && <ServiceDetailSheet service={serviceData} />}
      </main>
    </div>
  );
}
