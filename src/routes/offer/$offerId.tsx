import HeaderComponent from "@/components/layout/HeaderComponent";
import OfferDetails from "@/components/Pages/Offer/OfferDetails";
import { useSpecialOffersDetails } from "@/hooks/offer/useOfferDetails";
import useNavbarStore from "@/store/Navbar";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/offer/$offerId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { hide, show } = useNavbarStore((state) => state);
  useEffect(() => {
    hide();
    return () => {
      show();
    };
  }, [hide, show]);

  const { offerId } = Route.useParams();
  const { data: offerDetails, isLoading, isError } = useSpecialOffersDetails(Number(offerId));

  const offerData = offerDetails?.data;

  return (
    <div>
      <HeaderComponent title="Offer Details" />
      <main className="h-screen max-w-md mx-auto w-full">
        {offerData && <OfferDetails offer={offerData} fetchingState={{ isLoading, isError }} />}
      </main>
    </div>
  );
}
