import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Plus, Minus, SquarePen, ChevronLeft, ChevronRight } from "lucide-react";

interface Service {
  name: string;
  imageUrl: string | string[];
  price: number;
  category: string;
  description: string;
  isPopular: boolean;
  packages: string[];
}

interface ServiceDetailSheetProps {
  service: Service;
}

export default function ServiceDetailSheet({ service }: ServiceDetailSheetProps) {
  const [quantity, setQuantity] = React.useState(1);
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  const images = Array.isArray(service.imageUrl)
    ? service.imageUrl
    : [service.imageUrl];

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  const handlePrev = () => api?.scrollPrev();
  const handleNext = () => api?.scrollNext();

  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const handleIncrease = () => setQuantity((prev) => prev + 1);

  return (
    <>
      {/* ✅ Image Carousel */}
      <div className="relative w-full h-80 overflow-hidden">
        <Carousel
          setApi={setApi}
          plugins={[plugin.current]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full h-full"
        >
          <CarouselContent>
            {images.map((img, index) => (
              <CarouselItem key={index} className="basis-full">
                <div className="relative w-full h-80">
                  <img
                    src={img}
                    alt={`${service.name} image ${index + 1}`}
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* ✅ Slide Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur-sm rounded-full p-2 shadow-md flex items-center justify-center cursor-pointer opacity-80 hover:opacity-100 transition z-10"
              aria-label="Previous"
            >
              <ChevronLeft size={24} className="text-gray-800" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur-sm rounded-full p-2 shadow-md flex items-center justify-center cursor-pointer opacity-80 hover:opacity-100 transition z-10"
              aria-label="Next"
            >
              <ChevronRight size={24} className="text-gray-800" />
            </button>
          </>
        )}

        {/* ✅ Dots Indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
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
        )}
      </div>

      {/* ✅ Detail Section */}
      <div className="relative z-10 px-4 py-6 -mt-8 bg-white rounded-t-4xl">
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-gray-300 rounded-full" />
        <div className="bg-[#004422] w-[95px] h-[5px] rounded-[12.48px] mt-5 mb-5 mx-auto"></div>

        {/* ✅ Popular + Quantity Controls */}
        <div className="flex items-center justify-between mt-2 mb-2">
          <div className="flex items-center gap-2">
            {service.isPopular && (
              <span className="px-4 py-3 text-xs font-semibold bg-[#6F5D29]/10 text-[#6F5D29] rounded-[7.28px]">
                Popular
              </span>
            )}
          </div>

          {/* ✅ Compact Quantity Controls */}
          <div className="flex items-center gap-2">
            <button
              className="w-6 h-6 text-[#004422] bg-[#004422]/10 flex items-center justify-center border rounded hover:bg-[#004422]/20 transition"
              onClick={handleDecrease}
            >
              <Minus size={12} />
            </button>
            <span className="min-w-[24px] text-center">{quantity}</span>
            <button
              className="w-6 h-6 text-white bg-[#6F5D29] flex items-center justify-center border rounded hover:bg-[#5C4C24] transition"
              onClick={handleIncrease}
            >
              <Plus size={12} />
            </button>
          </div>
        </div>

        {/* ✅ Name + Description + Price */}
        <h1 className="text-2xl font-bold text-gray-900">{service.name}</h1>
        <div className="mt-4">
          <p className="mt-1 text-gray-600">{service.description}</p>
          <div className="text-[#09051C] text-2xl font-bold mt-4">
            ${service.price.toFixed(2)}
          </div>
        </div>

        {/* ✅ Special Request + Add to Cart */}
        <div className="flex flex-col gap-4 w-full mx-auto mt-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex items-center">
            <SquarePen className="text-[#6F5D29] mr-3" size={20} />
            <input
              type="text"
              placeholder="Special Request"
              aria-label="Special Request"
              className="flex-grow text-gray-800 placeholder-[#A89A81] focus:outline-none"
            />
          </div>
          <button className="bg-[#6F5D29] hover:bg-[#5C4C24] rounded-xl text-white w-full py-4 font-semibold text-lg transition duration-200 shadow-md">
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}
