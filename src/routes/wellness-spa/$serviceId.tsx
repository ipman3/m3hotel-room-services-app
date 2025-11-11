import { CarouselComponent } from "@/components/CarouselComponent";
import HeaderComponent from "@/components/layout/HeaderComponent";
import ServiceDetailSheet from "@/components/Pages/WellnessAndSpa/ServiceDetailSheet";
<<<<<<< HEAD
=======
import { Skeleton } from "@/components/ui/skeleton";
import { useSpaDetail } from "@/hooks/wellness-spa/useSpaDetail";
>>>>>>> origin/Bunheng-Dev
import useNavbarStore from "@/store/Navbar";
import post from "@sfutureapps/req-sdk";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/wellness-spa/$serviceId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { serviceId } = Route.useParams();
  const { hide, show } = useNavbarStore((state) => state);

<<<<<<< HEAD
  const { data: serviceData } = useQuery({
    queryKey: ["spaService", serviceId],
    queryFn: async () =>
      await post({
        endpoint: "spa/detail",
        data: { id: serviceId },
      }),
    enabled: !!serviceId,
  });

  console.log(serviceData);

  // const serviceData =
  //   spaItems.find((item) => item.id === serviceId) || spaItems[0];

=======
>>>>>>> origin/Bunheng-Dev
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
<<<<<<< HEAD
        <CarouselComponent imageUrls={serviceData?.data?.images || []} />
        <ServiceDetailSheet service={serviceData?.data} />
=======
        {isLoading ? (
          <Skeleton className="w-full h-80" />
        ) : (
          <CarouselComponent
            imageUrls={serviceData?.images ? [serviceData?.images[0]] : []}
          />
        )}
        {serviceData && <ServiceDetailSheet service={serviceData} />}
>>>>>>> origin/Bunheng-Dev
      </main>
    </div>
  );
}
