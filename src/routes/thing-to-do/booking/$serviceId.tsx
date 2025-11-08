import HeaderComponent from "@/components/layout/HeaderComponent";
import ServiceForm from "@/components/Pages/thing-to-do/ServiceForm";
import { useThingDetail } from "@/hooks/thing-to-do/useThingDetail";
import useNavbarStore from "@/store/Navbar";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/thing-to-do/booking/$serviceId")({
  component: RouteComponent,
});

function RouteComponent() {
  const serviceType = "thing-to-do";
  const { hide, show } = useNavbarStore((state) => state);
  const { serviceId } = Route.useParams();

  useEffect(() => {
    hide();
    return () => {
      show();
    };
  }, [hide, show]);

   const { data: thingDetail } = useThingDetail(Number(serviceId));
    const serviceData = thingDetail?.data;

  return (
    <div>
      <HeaderComponent title="Complete Your Booking" />
      <main className="max-w-md p-4 mx-auto">
        <h1 className="mb-2 text-2xl font-bold">{serviceData?.name}</h1>
        <p className="pt-4 mb-6 text-sm text-muted-foreground">
          Please fill out the details below to complete your booking.
        </p>

        {serviceData && (
          <ServiceForm
            id={serviceData.id}
            name={serviceData.name}
            short_desc={serviceData.short_desc}
            price={serviceData.price}
            category_id={serviceData.category_id}
            serviceType={serviceType}
            image={serviceData.image}
            unit={serviceData.unit}
          />
        )}
      </main>
    </div>
  );
}
