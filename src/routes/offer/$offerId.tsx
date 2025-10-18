import HeaderComponent from "@/components/layout/HeaderComponent";
import OfferDetails from "@/components/Pages/Offer/OfferDetails";
import { offerAndNewsItems } from "@/config/data/offer";
import useNavbarStore from "@/store/Navbar";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/offer/$offerId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { offerId } = Route.useParams();
  const offerData =
    offerAndNewsItems.find((item) => item.id === offerId) ||
    offerAndNewsItems[0];

  const { hide, show } = useNavbarStore((state) => state);

  useEffect(() => {
    hide();
    return () => {
      show();
    };
  }, [hide, show]);

  return (
    <div>
      <HeaderComponent title="Offer Details" />
      <main className="h-screen max-w-md mx-auto w-full">
        <OfferDetails offer={offerData} />
      </main>
    </div>
  );
}
