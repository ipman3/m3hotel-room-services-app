import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Loading from "@/components/LoadingComponent";
import { TagIcon } from "lucide-react";

interface Offer {
  id: number;
  name: string;
  image: string;
  desc: string;
  service_type: string;
}

interface fetchingState {
  isLoading: boolean;
  isError: boolean;
}

interface OfferDetailsProps {
  offer: Offer;
  fetchingState: fetchingState;
}

export default function OfferDetails({
  offer,
  fetchingState,
}: OfferDetailsProps) {
  return (
    <>
      {fetchingState.isLoading ? (
        <>
          <Loading />
        </>
      ) : fetchingState.isError ? (
        <p>Error loading offer details.</p>
      ) : (
        <Card className="overflow-hidden border-none shadow-none bg-background">
          <CardContent className="p-0">
            <img
              src={offer.image}
              alt={offer.name}
              className="object-cover w-full h-80 rounded-b-4xl"
            />
            <div className="p-6 space-y-2">
              <h1 className="text-lg font-bold capitalize">{offer.name.replace(/_/g, " ")}</h1>
              <div className="mt-2 text-sm capitalize w-fit text-amber-500">
                <TagIcon
                  className="inline-block p-1 mr-1 rounded-md bg-amber-500/20"
                  size={24}
                />
                {offer.service_type.replace(/_/g, " ")}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{offer.desc}</p>
              <Button className="w-full h-12 mt-4 text-lg rounded-full bg-base-primary">
                Book Now
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
