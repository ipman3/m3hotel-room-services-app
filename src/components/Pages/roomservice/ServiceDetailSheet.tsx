import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Plus, Minus, SquarePen, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useServiceStore } from "@/store/ServiceStore";
import { serviceSchema } from "@/validations/serviceSchema";

interface Service {
  name: string;
  image: string;
  imageUrl: string[];
  price: number;
  category: string;
  description: string;
  isPopular: boolean;
  packages?: string[];
  quantity: number;
}

interface Props {
  service: Service;
}

export default function ServiceDetailSheet({ service }: Props) {
  const [quantity, setQuantity] = React.useState(service.quantity || 1);
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const navigate = useNavigate();
  const addToCart = useServiceStore((s) => s.addToCart);

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  const handleAddToCart = () => {
    const payload = {
      name: service.name,
      description: service.description,
      imageUrl: Array.isArray(service.imageUrl)
        ? service.imageUrl
        : [service.imageUrl],
      quantity,
      price: service.price,
      message: "",
    };

    const parsed = serviceSchema.safeParse(payload);
    if (!parsed.success) {
      alert(parsed.error.issues?.[0]?.message ?? "Invalid service data");
      return;
    }

    addToCart(parsed.data);
    navigate({ to: "/room-service/confirm-appointment" });
  };

  return (
    <>
      {/* Image Carousel */}
      <div className="relative w-full h-80 overflow-hidden">
        <Carousel
          setApi={setApi}
          plugins={[plugin.current]}
          opts={{ align: "start", loop: true }}
          className="w-full h-full"
        >
          <CarouselContent>
            {service.imageUrl.map((img, index) => (
              <CarouselItem key={index} className="basis-full">
                <img
                  src={img}
                  alt={`${service.name} image ${index + 1}`}
                  className="object-cover w-full h-80"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        {service.imageUrl.length > 1 && (
          <>
            <button
              onClick={() => api?.scrollPrev()}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2 shadow-md"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => api?.scrollNext()}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2 shadow-md"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {/* Details */}
      <div className="relative z-10 px-4 py-6 -mt-8 bg-white rounded-t-4xl">
        <div className="bg-[#004422] w-[95px] h-[5px] rounded-[12.48px] mb-5 mx-auto"></div>

        <div className="flex items-center justify-between mt-2 mb-2">
          {service.isPopular && (
            <span className="px-4 py-3 text-xs font-semibold bg-[#6F5D29]/10 text-[#6F5D29] rounded-[7.28px]">
              Popular
            </span>
          )}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-6 h-6 text-[#004422] bg-[#004422]/10 flex items-center justify-center border rounded"
            >
              <Minus size={12} />
            </button>
            <span className="min-w-[24px] text-center">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-6 h-6 text-white bg-[#6F5D29] flex items-center justify-center border rounded"
            >
              <Plus size={12} />
            </button>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900">{service.name}</h1>
        <p className="mt-2 text-gray-600">{service.description}</p>
        <div className="text-[#09051C] text-2xl font-bold mt-4">
          ${service.price.toFixed(2)}
        </div>

        <div className="flex flex-col gap-4 w-full mx-auto mt-6">
          <div className="bg-white rounded-[7.28px] border border-gray-200 shadow-sm p-2 flex items-center">
            <SquarePen className="text-[#6F5D29] mr-3" size={20} />
            <input
              type="text"
              placeholder="Special Request"
              className="flex-grow text-gray-800 placeholder-[#A89A81] focus:outline-none"
            />
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-[#6F5D29] hover:bg-[#5C4C24] rounded-[7.28px] text-white w-full py-2 font-semibold text-lg shadow-md"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}
