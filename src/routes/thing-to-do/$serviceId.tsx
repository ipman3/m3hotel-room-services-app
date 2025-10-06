import HeaderComponent from "@/components/layout/HeaderComponent";
import ServiceDetailSheet from "@/components/Pages/thing-to-do/ServiceDetailSheet";
import { thingItems } from "@/config/data/thing-to-do";

import useNavbarStore from "@/store/Navbar";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/thing-to-do/$serviceId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { serviceId } = Route.useParams();
  const { hide, show } = useNavbarStore((state) => state);

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
      <HeaderComponent title="Selected items" />
      <main>
        <img
          src={serviceData.imageUrl}
          alt={serviceData.name}
          className="object-cover w-full h-80"
        />
        <ServiceDetailSheet service={serviceData} />
      </main>
    </div>
  );
}
