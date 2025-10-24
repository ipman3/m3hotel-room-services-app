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
    <Card className="overflow-hidden border-none shadow-none bg-background">
      <CardContent className="p-0">
        <img
          src={offer.imageUrl}
          alt={offer.title}
          className="object-cover w-full h-80"
        />
        <div className="p-6">
          <h1 className="text-lg font-bold">{offer.title}</h1>
          <p className="mt-2 text-muted-foreground text-sm">{offer.description}</p>
          <p className="my-4 text-xl font-bold">
            ${offer.price.toFixed(2)} <span className="text-sm text-base-secondary">/ per hour</span>
          </p>
          <Button className="w-full text-lg rounded-full bg-base-primary h-12">
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
