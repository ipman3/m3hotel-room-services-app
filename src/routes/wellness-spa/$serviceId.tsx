import HeaderComponent from "@/components/layout/HeaderComponent";
import ServiceDetailSheet from "@/components/Pages/WellnessAndSpa/ServiceDetailSheet";
import { spaItems } from "@/config/data/wellness-spa";
import useNavbarStore from "@/store/Navbar";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/wellness-spa/$serviceId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { serviceId } = Route.useParams();
  const { hide, show } = useNavbarStore((state) => state);

  const serviceData =
    spaItems.find((item) => item.id === serviceId) || spaItems[0];

  useEffect(() => {
    hide();
    return () => {
      show();
    };
  }, [hide, show]);

  return (
    <div>
      <HeaderComponent title="Selected items" />
      <main className="h-screen bg-muted-background">
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
