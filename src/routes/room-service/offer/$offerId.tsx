import HeaderComponent from "@/components/layout/HeaderComponent";
import OfferDetails from "@/components/Pages/roomservice/Offer/OfferDetails";
import { OfferServiceItem } from "@/config/data/offer-room-service";
import useNavbarStore from "@/store/Navbar";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/room-service/offer/$offerId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { offerId } = Route.useParams();
  const offerData =
    OfferServiceItem.find((item) => item.id === offerId) ||
    OfferServiceItem[0];

  const { hide, show } = useNavbarStore((state) => state);

  useEffect(() => {
    hide();
    return () => {
      show();
    };
  }, [hide, show]);

  return (
    <div>
      <HeaderComponent title="Details" />
      <main>
        <OfferDetails offer={offerData} />
      </main>
    </div>
  );
}
