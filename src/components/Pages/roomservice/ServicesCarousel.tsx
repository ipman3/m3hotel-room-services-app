import * as React from "react";
import { Link } from "@tanstack/react-router";
import Autoplay from "embla-carousel-autoplay";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import { roomItem } from "@/config/roomservice";

export default function ServicesCarousel() {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);

    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
    );

    React.useEffect(() => {
        if (!api) {
            return;
        }
        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap());

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    return (
        <section>
            <div className="flex items-center justify-between px-4 mb-4">
                <h2 className="text-lg font-bold text-card-foreground">
                    Trending offers & news
                </h2>
                <Link to="/room-service/offer">
                    <span className="text-sm font-semibold text-base-accent">
                        View All
                    </span>
                </Link>
            </div>

            <div className="relative">
                <Carousel
                    setApi={setApi}
                    plugins={[plugin.current]}
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full px-4"
                >
                    <CarouselContent>
                        {roomItem.map((offer, index) => (
                            <CarouselItem key={index} className="basis-1/1">
                                <div className="relative h-48">
                                    <img
                                        src={offer.imageUrl}
                                        alt={offer.title}
                                        className="object-cover w-full h-full rounded-xl"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 w-full pointer-events-none bg-black/20 rounded-xl" />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>

                <div className="absolute left-0 right-0 flex items-center justify-center gap-2 bottom-4">
                    {Array.from({ length: count }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => api?.scrollTo(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${current === index ? "w-4 bg-white" : "w-2 bg-white/50"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
