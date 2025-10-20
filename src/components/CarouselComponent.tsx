import { cn } from "@/lib/utils"; 
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface CarouselProps {
  imageUrls: string[];
  className?: string;
}

export function CarouselComponent({ imageUrls = [], className }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setPrevBtnDisabled(!emblaApi.canScrollPrev());
      setNextBtnDisabled(!emblaApi.canScrollNext());
    };
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  if (imageUrls.length === 0) {
    return (
      <div
        className={cn(
          "relative flex h-80 w-full items-center justify-center bg-muted",
          className
        )}
      >
        <p>No images to display</p>
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {imageUrls.map((url, index) => (
            <div
              className="relative min-w-0 flex-grow-0 flex-shrink-0 basis-full"
              key={index}
            >
              <img
                src={url}
                alt={`Carousel image ${index + 1}`}
                className="object-cover w-full h-80"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Hide controls if only one image */}
      {imageUrls.length > 1 && (
        <>
          <button
            className="absolute top-1/2 -translate-y-1/2 left-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/20 text-card transition-opacity"
            onClick={scrollPrev}
            disabled={prevBtnDisabled}
          >
            <ChevronLeftIcon />
          </button>
          <button
            className="absolute top-1/2 -translate-y-1/2 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/20 text-card transition-opacity"
            onClick={scrollNext}
            disabled={nextBtnDisabled}
          >
            <ChevronRightIcon />
          </button>
          <div className="absolute bottom-12 left-0 right-0 z-10 flex items-center justify-center gap-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? "w-4 bg-background"
                    : "bg-background/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}