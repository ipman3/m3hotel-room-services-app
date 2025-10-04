import HeaderComponent from "@/components/layout/HeaderComponent";
import ServiceDetailSheet from "@/components/Pages/roomservice/ServiceDetailSheet";
import { serviceItems } from "@/config/data/room-service";
import useNavbarStore from "@/store/Navbar";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/room-service/$serviceId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { serviceId } = Route.useParams();
  const { hide, show } = useNavbarStore((state) => state);

  const serviceData =
    serviceItems.find((item) => item.id === serviceId) || serviceItems[0];

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
