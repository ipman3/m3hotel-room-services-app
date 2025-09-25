import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { offerItems } from "@/config/gridItems";
import Autoplay from "embla-carousel-autoplay";

export default function OffersCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );
  return (
    <section>
      <div className="flex items-center justify-between mb-4 px-4">
        <h2 className="text-lg font-bold text-card-foreground">
          Offers & News
        </h2>
      </div>
      <Carousel
        plugins={[plugin.current]}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {offerItems.map((offer, index) => (
            <CarouselItem key={index} className="basis-1/1">
              <div className="h-48 px-4">
                <img
                  src={offer.imageUrl}
                  alt={offer.title}
                  className="w-full h-full object-cover rounded-xl"
                  loading="lazy"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute -top-10 right-0 flex items-center gap-2 px-4">
          <CarouselPrevious className="static translate-y-0" />
          <CarouselNext className="static translate-y-0" />
        </div>
      </Carousel>
    </section>
  );
}
