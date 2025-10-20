import { Button } from "@/components/ui/button";
import { useCartStore, type CartItem } from "@/store/CartStore";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

export default function MainPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const setPendingItem = useCartStore((state) => state.setPendingItem);
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <p className="p-8 text-center text-muted-foreground">
        Your cart is empty.
      </p>
    );
  }

  const handleClearCart = () => {
    clearCart();
    toast.success("Your cart has been cleared.");
  };

  // Clicking on a single item card
  const handleClickConfirmCheckout = (itemToConfirm: CartItem) => {
    setPendingItem(itemToConfirm);
    // console.log(`Setting pending item for service type: ${itemToConfirm.serviceType}`);

    let navigationPath = "/";

    switch (itemToConfirm.serviceType) {
      case "wellness-spa":
        navigationPath = "/wellness-spa/confirm-appointment";
        break;
      case "room-service":
        navigationPath = "/room-service/confirm";
        break;
      case "thing-to-do":
        navigationPath = "/thing-to-do/confirm-booking";
        break;
      default:
        console.warn(
          `Unknown service type: "${itemToConfirm.serviceType}". Navigating to default confirmation page.`
        );
        // navigationPath = "/confirm-appointment";
        toast.error(
          "Unknown service type. Please contact support for assistance."
        );
        break;
    }

    navigate({ to: navigationPath });
  };

  return (
    <div className="px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-base-secondary">Order Details</h2>
        <Button
          variant="link"
          className="h-auto p-0 text-red-500"
          onClick={handleClearCart}
        >
          Clear All
        </Button>
      </div>
      <div className="space-y-4">
       {items.map((currentItem) => {
          return (
            <div
              key={currentItem.id}
              onClick={() => handleClickConfirmCheckout(currentItem)}
              className="flex items-center gap-4 p-2 bg-white cursor-pointer rounded-2xl customShadowSm"
            >
              <img
                src={currentItem?.imageUrl}
                alt={currentItem?.serviceName}
                className="object-cover w-24 h-24 rounded-xl"
              />
              <div className="flex-grow">
                <h2 className="font-bold">{currentItem.serviceName}</h2>
                <p className="text-sm text-muted-foreground">
                  {currentItem?.description.slice(0, 20)}...
                </p>
                <p className="text-sm font-semibold text-base-secondary">
                  ${currentItem.price.toFixed(2)}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  removeItem(currentItem.id);
                }}
                aria-label="Remove item"
              >
                <Trash2 className="w-5 h-5 text-red-500" />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
