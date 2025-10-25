import { Card, CardContent } from "@/components/ui/card";
import { serviceItems } from "@/config/serviceItems";
import { useCartStore } from "@/store/CartStore";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

type PendingNavigation = {
  path: string;
  serviceType: string;
};

export default function ServiceGrid() {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pendingNavigation, setPendingNavigation] =
    useState<PendingNavigation | null>(null);

  const handleServiceClick = (path: string, clickedServiceType: string) => {
    const nonOrderableServices = ["support"];

    if (nonOrderableServices.includes(clickedServiceType)) {
      // It's 'Support', just navigate
      navigate({ to: path });
      return;
    }

    // if cart is empty, just navigate
    if (items.length === 0) {
      navigate({ to: path });
      return;
    }

    const cartServiceType = items[0].serviceType;

    if (cartServiceType === clickedServiceType) {
      navigate({ to: path });
      return;
    }

    if (cartServiceType !== clickedServiceType) {
      setPendingNavigation({ path, serviceType: clickedServiceType });
      setIsDialogOpen(true);
    }
  };

  const handleConfirmNavigation = () => {
    if (!pendingNavigation) return;

    // Clear the cart
    clearCart();
    toast.info("Your cart was cleared.");

    // Navigate to the page they originally clicked
    navigate({ to: pendingNavigation.path });

    // Reset state (this will also be handled by onOpenChange)
    setPendingNavigation(null);
  };

  return (
    <>
      <section className="px-4">
        <h2 className="mb-4 text-lg font-bold text-card-foreground">
          Please choose below services
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {serviceItems.map((item) => (
            <Card
              key={item.label}
              className="transition-transform border-none cursor-pointer rounded-2xl customShadowSm active:scale-95"
              onClick={() => handleServiceClick(item.path, item.serviceType)}
            >
              <CardContent className="flex flex-col items-center justify-center gap-2">
                <div className="p-2 rounded-full bg-slate-100">
                  <img
                    src={item.icon}
                    alt={`${item.label} icon`}
                    className="object-contain w-12 h-12"
                  />
                </div>
                <span className="font-semibold text-center text-card-foreground">
                  {item.label}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <AlertDialog
        open={isDialogOpen}
        onOpenChange={(isOpen) => {
          setIsDialogOpen(isOpen);
          if (!isOpen) {
            setPendingNavigation(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Switch service type?</AlertDialogTitle>
            <AlertDialogDescription>
              Your cart contains items from a different service. To add new
              items, your existing cart must be cleared. Do you want to
              continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, Go Back</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmNavigation}>
              Yes, Clear Cart
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
