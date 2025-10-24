import { Button } from "@/components/ui/button";
import { useCartStore, type CartItem } from "@/store/CartStore";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";

type DisplayItem = CartItem & {
  originalIds?: string[];
};

export default function MainPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const setPendingItem = useCartStore((state) => state.setPendingItem);
  const navigate = useNavigate();

  const displayedItems = useMemo(() => {
    // Use a Map for efficient grouping. Key: item name, Value: DisplayItem
    const groupedItems = new Map<string, DisplayItem>();

    // Group items by name and sum their quantities
    for (const item of items) {
      const key = item.name;
      const quantity = item.quantity || 1;

      if (groupedItems.has(key)) {
        const existing = groupedItems.get(key)!;
        existing.quantity = (existing.quantity || 0) + quantity;
        existing.originalIds?.push(item.id);
      } else {
        groupedItems.set(key, {
          ...item,
          quantity: quantity,
          originalIds: [item.id],
        });
      }
    }
    
    return Array.from(groupedItems.values()); // return all grouped items as an array
  }, [items]);

  if (displayedItems.length === 0) {
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

  const handleClickConfirmCheckout = (itemToConfirm: CartItem) => {
    setPendingItem(itemToConfirm);
    // console.log(`Setting pending item for service type: ${itemToConfirm.serviceType}`);

    let navigationPath = "/";

    switch (itemToConfirm.serviceType) {
      case "wellness-spa":
        navigationPath = "/wellness-spa/confirm-appointment";
        break;
      case "room-service":
        navigationPath = "/room-service/place-order";
        break;
      case "thing-to-do":
        navigationPath = "/thing-to-do/confirm-booking";
        break;
      default:
        console.warn(
          `Unknown service type: "${itemToConfirm.serviceType}". Navigating to default confirmation page.`
        );
        toast.error(
          "Unknown service type. Please contact support for assistance."
        );
        break;
    }

    navigate({ to: navigationPath });
  };

  const handleRemoveItem = (item: DisplayItem) => {
    if (item.originalIds && item.originalIds.length > 0) {
      item.originalIds.forEach((id) => removeItem(id));
      toast.success(`Removed all ${item.name} from cart.`);
    } else {
      removeItem(item.id);
      toast.success(`Removed ${item.name} from cart.`);
    }
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
        {displayedItems.map((currentItem) => {
          const quantity = currentItem.quantity || 1;

          return (
            <div
              key={currentItem.name}
              onClick={() => handleClickConfirmCheckout(currentItem)}
              className="flex items-center gap-4 p-2 bg-white cursor-pointer rounded-2xl customShadowSm"
            >
              <img
                src={currentItem?.imageUrl}
                alt={currentItem?.name}
                className="object-cover w-24 h-24 rounded-xl"
              />
              <div className="flex-grow">
                <h2 className="font-bold">{currentItem.name}</h2>
                <>
                  <p className="text-sm text-muted-foreground">
                    Unit Price: ${currentItem.price.toFixed(2)}
                  </p>
                  <p className="text-sm font-semibold text-base-secondary">
                    Quantity: x{quantity}
                  </p>
                  <p className="mt-1 text-base font-bold text-base-secondary">
                    Total: ${(currentItem.price * quantity).toFixed(2)}
                  </p>
                </>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveItem(currentItem);
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