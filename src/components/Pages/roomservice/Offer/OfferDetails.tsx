import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Offer {
  title: string;
  imageUrl: string;
  description: string;
  price: number;
}

interface OfferDetailsProps {
  offer: Offer;
}

export default function OfferDetails({ offer }: OfferDetailsProps) {
  return (
    <Card className="overflow-hidden shadow-none border-none">
      <CardContent className="p-0">
        <img
          src={offer.imageUrl}
          alt={offer.title}
          className="w-full h-56 object-cover"
        />
        <div className="p-6 bg-white">
          <h1 className="text-xl font-bold">{offer.title}</h1>
          <p className="text-muted-foreground mt-2">{offer.description}</p>
          <p className="text-xl font-bold my-4">
            ${offer.price.toFixed(2)} / per hour
          </p>
          <Button className="w-full bg-base-primary rounded-full h-14 text-lg">
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
