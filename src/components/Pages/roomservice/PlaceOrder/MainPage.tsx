import { Plus, Minus, Trash2 } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useCartStore } from "@/store/CartStore";
import { Button } from "@/components/ui/button";
import { placeOrderSchema, type PlaceOrderInput } from "@/validations/placeOrder";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CustomButtonSubmit } from "@/components/CustomSubmitButtonCom";
import { DetailRow } from "./DetailRow";
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
import { toast } from "sonner";

export default function PlaceOrderPage() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, confirmPendingItem, clearCartByServiceType } = useCartStore();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const filteredItems = items.filter((item) => item.serviceType === "room-service");

  const getSubtotal = () => {
    return filteredItems.reduce((acc, item) => {
      const quantity = item.quantity || 1;
      return acc + item.price * quantity;
    }, 0);
  };

  const form = useForm<PlaceOrderInput>({
    resolver: zodResolver(placeOrderSchema),
    defaultValues: {
      customerName: "",
      roomNumber: "",
    },
  });

  const discountAmount = 0.0;
  const subTotal = getSubtotal();
  const discountedSubtotal = subTotal - discountAmount;
  const serviceChargePercent = 7;
  const serviceCharge = discountedSubtotal * (serviceChargePercent / 100);
  const total = discountedSubtotal + serviceCharge;
  const { trigger } = form;

  const onSubmit = (data: PlaceOrderInput) => {
    const combinedData = {
      ...data,
      orderItems: filteredItems,
      total,
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

    console.log("FormData prepared:", JSON.stringify(Object.fromEntries(formData)));

    confirmPendingItem?.();
    clearCartByServiceType("room-service");
    navigate({ to: "/success" });
  };

  if (items.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <p>No appointment to confirm.</p>
        <Button onClick={() => navigate({ to: "/room-service" })} className="mt-4 bg-base-primary text-card">
          Go back to services
        </Button>
      </div>
    );
  }

  // Just validate form before opening dialog
  const handleOpenConfirmDialog = async () => {
    const isValid = await trigger();

    if (isValid) {
      setIsConfirmOpen(true);
    } else {
      toast.error("Please fill in all required customer details.");
    }
  };

  return (
    <div className="px-4 py-4 space-y-4">
      <div className="max-w-md pt-6 mx-auto space-y-4">
        {/* Customer Info */}
        <div className="flex items-center gap-4 p-4 bg-muted-background rounded-2xl customShadowSm">
          <div className="flex flex-col w-full gap-4">
            <h2 className="text-lg font-bold text-base-secondary">Customer Info</h2>

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
                        <Input placeholder="Enter room number" className="w-full py-5" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>

        {/* Order Details */}
        <div className="p-4 bg-muted-background rounded-2xl customShadowSm">
          <div className="relative space-y-3">
            <h3 className="mb-4 text-lg font-bold text-base-secondary">Order Items</h3>

            <div className="space-y-2 last:mb-0">
              {filteredItems?.map((item) => (
                <div
                  key={item.id}
                  className="relative flex items-center justify-between gap-2 px-2 py-3 pb-3 text-sm border-b border-gray-100 rounded-lg last:border-0 customShadowSm">
                  <div>
                    <img src={item.imageUrl} alt={item.serviceName} className="flex-shrink-0 object-cover rounded-lg w-22 h-22" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 mb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-base font-semibold text-base-secondary">{item.serviceName}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1">{item.description}</div>
                      </div>
                      <button onClick={() => removeItem(item.id)}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>

                    <div className="text-base font-bold text-base-secondary">${item.price!.toFixed(2)}</div>
                  </div>

                  <div className="absolute bottom-0 flex items-center gap-2 -translate-y-1/2 right-2">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))}
                      disabled={(item.quantity || 1) <= 1}
                      className={`w-6 h-6 ${
                        (item.quantity || 1) > 1 ? "text-white bg-base-primary" : "text-muted-foreground bg-gray-200"
                      } flex items-center justify-center rounded-full disabled:opacity-50`}>
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity || 1}</span>
                    <button
                      onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                      className="flex items-center justify-center w-6 h-6 text-white rounded-full bg-base-primary">
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="p-4 bg-muted-background rounded-2xl customShadowSm">
        <h3 className="mb-2 text-lg font-bold text-base-secondary">Price Detail</h3>
        <DetailRow label="Subtotal" value={`$${subTotal.toFixed(2)}`} />
        <DetailRow label="Discount" value={`$${discountAmount.toFixed(2)}`} />
        <DetailRow label={`Service Charge (${serviceChargePercent}%)`} value={`$${serviceCharge.toFixed(2)}`} />
        <div className="flex items-center justify-between py-3 mt-2">
          <span className="text-lg font-semibold text-black">Total</span>
          <span className="text-lg font-bold">{`$${total.toFixed(2)}`}</span>
        </div>
      </div>

      <CustomButtonSubmit textBtn="Place Order" isLoading={form.formState.isSubmitting} onClick={handleOpenConfirmDialog} type="button" />

      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Your Order</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to place this order? Your card will be charged a total of <strong>${total.toFixed(2)}</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={form.handleSubmit(onSubmit)} disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Placing Order..." : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
