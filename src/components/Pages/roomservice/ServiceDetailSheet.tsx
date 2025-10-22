import { Plus, Minus } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useCartStore } from "@/store/CartStore";
import { toast } from "sonner";

interface Service {
  id: string;
  name: string;
  serviceTypeId: number;
  serviceType: string;
  imageUrl: string;
  description: string;
  price: number;
  category: string;
  isPopular: boolean;
  quantity?: number;
}

interface Props {
  service: Service;
}

export default function ServiceDetailSheet({ service }: Props) {
  const [quantity, setQuantity] = useState(service.quantity || 1);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    const newItem = {
      name: service.name,
      price: service.price,
      quantity: quantity,
      message: message,
      imageUrl: service.imageUrl,
      description: service.description,
      category: service.category,
      serviceTypeId: service.serviceTypeId,
      serviceType: service.serviceType,
    };
    addItem(newItem);
    toast.success("Item added to cart!", {
      duration: 8000,
      action: { label: "View Cart", onClick: () => navigate({ to: "/cart" }) },
    });
    navigate({ to: "/room-service" });
  };

  return (
    <div className="relative z-10 px-4 py-6 -mt-8 bg-background rounded-t-4xl">
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-base-input rounded-full" />

      <div className="flex items-center justify-between my-4">
        {service.isPopular && (
          <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-base-accent/20 text-base-accent">
            Popular
          </span>
        )}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className={`w-6 h-6 ${quantity > 1 ? "text-white bg-base-primary" : "text-muted-foreground bg-gray-200"} flex items-center justify-center rounded-full`}
          >
            <Minus size={12} />
          </button>
          <span className="min-w-[24px] text-center">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="flex items-center justify-center w-6 h-6 text-white rounded-full bg-base-primary"
          >
            <Plus size={12} />
          </button>
        </div>
      </div>

      <h1 className="text-xl font-bold text-black">{service.name}</h1>
      <p className="mt-2 text-sm text-base-secondary">{service.description}</p>
      <div className="text-xl font-bold text-primary">
        ${service.price.toFixed(2)}
      </div>

      <div className="flex flex-col w-full gap-2 mt-8">
        <label>Instructions</label>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="e.g., No onions, extra napkins, etc."
          className="placeholder-gray-400 bg-base-input"
        />
        <div className="mt-4">
          <Button
            onClick={handleAddToCart}
            className="w-full h-12 py-5 text-base bg-base-primary"
          >
            Add {quantity} to Cart - ${(service.price * quantity).toFixed(2)}
          </Button>
        </div>
      </div>
    </div>
  );
}
