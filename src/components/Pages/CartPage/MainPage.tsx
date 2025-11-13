import { Button } from "@/components/ui/button";
import { useCartStore, type CartItem } from "@/store/CartStore";
import { toast } from "sonner";
import { X } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerFormSchema, type CustomerFormData } from "@/validations/customerForm";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CustomButtonSubmit } from "@/components/CustomSubmitButtonCom";
import { DetailRow } from "@/components/DetailRow";
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
import { Icons } from "../../../../public/assets/icons";

type DisplayItem = CartItem & {
  originalIds?: string[];
};

export default function MainPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const confirmPendingItem = useCartStore((state) => state.confirmPendingItem);
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);
  const navigate = useNavigate();
  // const setPendingItem = useCartStore((state) => state.setPendingItem);

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

    return Array.from(groupedItems.values());
  }, [items]);

  const getSubtotal = () => {
    return displayedItems.reduce((acc, item) => {
      const quantity = item.quantity || 1;
      return acc + parseFloat(item.price) * quantity;
    }, 0);
  };

  const table_name = localStorage.getItem("table_name") || null;
  const form = useForm<CustomerFormData>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      customerName: "",
      roomNumber: table_name || "",
    },
  });

  if (displayedItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 pt-20">
        <img src={Icons.EmptyCartIcon} alt="Empty Cart" width={500} height={500} className="w-32 h-32" />
        <p className="text-base text-center text-base-secondary">Your cart is empty.</p>
        <Button className="h-8 border bg-primary/20 text-primary border-base-primary/20 hover:bg-primary/20">
          <Link to="/">Browse Services</Link>
        </Button>
      </div>
    );
  }

  const discountAmount = 0.0;
  const subTotal = getSubtotal();
  const discountedSubtotal = subTotal - discountAmount;
  const serviceChargePercent = 0;
  // const serviceCharge = discountedSubtotal * (serviceChargePercent / 100);
  const serviceCharge = 0;
  const total = discountedSubtotal + serviceCharge;

  const onSubmit = (data: CustomerFormData) => {
    const combinedData = {
      ...data,
      items: displayedItems,
      subTotal: getSubtotal(),
      finalTotal: total,
      total: total,
      totalDiscount: discountAmount,
      store_id: 12,
      table_id: localStorage.getItem("table_id"),
    };

    // Convert to FormData
    const formData = new FormData();
    Object.entries(combinedData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (typeof value === "object") {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, String(value));
        }
      }
    });

    console.log("FormData prepared:", combinedData);

    // confirmPendingItem?.();
    // clearCart();
    // navigate({ to: "/success" });
  };

  const handleClearCart = () => {
    setIsClearDialogOpen(true);
  };

  const handleConfirmClearCart = () => {
    clearCart();
    toast.success("Your cart has been cleared.");
    setIsClearDialogOpen(false);
    navigate({ to: "/" });
  };

  // const handleClickConfirmCheckout = (itemToConfirm: CartItem) => {
  //   setPendingItem(itemToConfirm);

  //   let navigationPath = "/";

  //   switch (itemToConfirm.serviceType) {
  //     case "wellness-spa":
  //       navigationPath = "/wellness-spa/confirm-appointment";
  //       break;
  //     case "room-service":
  //       navigationPath = "/room-service/place-order";
  //       break;
  //     case "thing-to-do":
  //       navigationPath = "/thing-to-do/confirm-booking";
  //       break;
  //     default:
  //       console.warn(
  //         `Unknown service type: "${itemToConfirm.serviceType}". Navigating to default confirmation page.`
  //       );
  //       toast.error(
  //         "Unknown service type. Please contact support for assistance."
  //       );
  //       break;
  //   }

  //   navigate({ to: navigationPath });
  // };

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
        <Button variant="link" className="h-auto p-0 text-red-500" onClick={handleClearCart}>
          Clear All
        </Button>
      </div>

      <div className="flex items-center gap-4 p-4 bg-muted-background rounded-2xl customShadowSm">
        <div className="flex flex-col w-full gap-4">
          <h2 className="text-lg font-semibold underline text-base-secondary">Customer Info</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3" noValidate>
              {/* Customer Name */}
              <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" className="w-full py-5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Room Number */}
              <FormField
                control={form.control}
                name="roomNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room Number</FormLabel>
                    <FormControl>
                      <Input readOnly placeholder="Enter room number" className="w-full py-5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </div>

      <div className="p-2 space-y-3 bg-muted-background rounded-2xl customShadowSm">
        <h2 className="pl-2 text-lg font-semibold underline text-base-secondary">Order Item</h2>
        {displayedItems.map((currentItem) => {
          const quantity = currentItem.quantity || 1;

          return (
            <div
              key={currentItem.name}
              // onClick={() => handleClickConfirmCheckout(currentItem)}
              className="flex items-center gap-3 px-2 py-1 pb-4 border-b border-gray-300 border-dotted bg-card last:pb-0 last:border-0">
              <img src={currentItem?.image} alt={currentItem?.name} className="object-cover rounded-lg w-18 h-18" />
              <div className="flex-grow">
                <h2 className="text-base font-semibold">{currentItem.name}</h2>
                <>
                  <p className="text-xs text-muted-foreground">Unit Price: ${parseFloat(currentItem.price).toFixed(2)}</p>
                  <p className="text-xs font-semibold text-base-secondary">Quantity: x{quantity}</p>
                  <p className="mt-1 text-sm font-semibold text-base-secondary">Total: ${(parseFloat(currentItem.price) * quantity).toFixed(2)}</p>
                </>
              </div>
              <Button
                className="w-6 h-6 rounded-full bg-red-500/10 hover:bg-red-500/10"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveItem(currentItem);
                }}
                aria-label="Remove item">
                <X className="w-5 h-5 text-red-500" />
              </Button>
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-muted-background rounded-2xl customShadowSm">
        <h3 className="mb-2 text-lg font-semibold underline text-base-secondary">Price Detail</h3>
        <DetailRow label="Subtotal" value={`$${subTotal.toFixed(2)}`} />
        <DetailRow label="Discount" value={`$${discountAmount.toFixed(2)}`} />
        <DetailRow label={`Service Charge (${serviceChargePercent}%)`} value={`$${serviceCharge.toFixed(2)}`} />
        <div className="flex items-center justify-between py-3 mt-2">
          <span className="text-lg font-bold text-black">Total</span>
          <span className="text-lg font-bold">{`$${total.toFixed(2)}`}</span>
        </div>
      </div>

      <CustomButtonSubmit textBtn="Confirm" isLoading={form.formState.isSubmitting} onClick={form.handleSubmit(onSubmit)} />

      <AlertDialog open={isClearDialogOpen} onOpenChange={setIsClearDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone. This will permanently remove all items from your cart.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmClearCart}>Yes, Clear Cart</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
