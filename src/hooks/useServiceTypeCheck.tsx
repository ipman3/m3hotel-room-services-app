import { useState, useEffect } from "react";
import { useNavigate, useMatches } from "@tanstack/react-router";
import { useCartStore } from "@/store/CartStore";
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

export function useServiceTypeCheck() {
  const navigate = useNavigate();

  const cartLength = useCartStore((state) => state.items.length);
  const cartServiceType = useCartStore((state) =>
    state.items.length > 0 ? state.items[0].serviceType : null
  );
  const clearCart = useCartStore((state) => state.clearCart);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const matches = useMatches();

  useEffect(() => {
    const activeMatch = matches[matches.length - 1];
    const currentServiceType = (
      activeMatch?.context as { serviceType?: string }
    )?.serviceType;

    if (!currentServiceType) {
      setIsDialogOpen(false);
      return;
    }

    const nonOrderableServices = ["support"];
    if (nonOrderableServices.includes(currentServiceType)) {
      return;
    }

    if (cartLength === 0) {
      return;
    }

    if (cartServiceType && cartServiceType !== currentServiceType) {
      setIsDialogOpen(true);
    }
  }, [matches, cartLength, cartServiceType, navigate]);

  const handleConfirm = () => {
    clearCart();
    toast.info("Your cart was cleared to switch to a different service type.");
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    navigate({ to: "/" });
  };

  const ServiceTypeDialog = (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogContent className="bg-black/10 backdrop-blur-sm border border-card/20">
        <AlertDialogHeader className="text-card">
          <AlertDialogTitle>Switch service type?</AlertDialogTitle>
          <AlertDialogDescription className="text-card">
            Your cart has items from another service. Clear the cart to add new
            items. Continue?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-card/50" onClick={handleCancel}>
            No, Go Back
          </AlertDialogCancel>
          <AlertDialogAction className="bg-primary" onClick={handleConfirm}>
            Yes, Clear Cart
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return { ServiceTypeDialog };
}
