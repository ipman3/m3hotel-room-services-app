import HeaderComponent from "@/components/layout/HeaderComponent";
import ServiceForm from "@/components/Pages/thing-to-do/ServiceForm";
import { thingItems } from "@/config/data/thing-to-do";
import useNavbarStore from "@/store/Navbar";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/thing-to-do/booking/$serviceId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { hide, show } = useNavbarStore((state) => state);
  const { serviceId } = Route.useParams();
  const serviceData =
    thingItems.find((item) => item.id === serviceId) || thingItems[0];

  useEffect(() => {
    hide();
    return () => {
      show();
    };
  }, [hide, show]);

  return (
    <div>
      <HeaderComponent title="Complete Your Booking" />
      <main className="max-w-md p-4 mx-auto">
        <h1 className="mb-2 text-2xl font-bold">{serviceData.name}</h1>
        <p className="pt-4 mb-6 text-sm text-muted-foreground">
          Please fill out the details below to complete your booking.
        </p>

        <ServiceForm
          id={serviceData.id}
          packages={serviceData.packages}
          name={serviceData.name}
          description={serviceData.description}
          isPopular={serviceData.isPopular}
          price={serviceData.price}
          category={serviceData.category}
          serviceTypeId={serviceData.serviceTypeId}
          serviceType={serviceData.serviceType}
          imageUrl={serviceData.imageUrl}
        />
      </main>
    </div>
  );
}
