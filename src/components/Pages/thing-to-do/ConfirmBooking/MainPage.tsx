import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useCartStore } from "@/store/CartStore";
import { DetailRow } from "./DetailRow";
import { useNavigate } from "@tanstack/react-router";

import { zodResolver } from "@hookform/resolvers/zod";
import { CustomButtonSubmit } from "@/components/CustomSubmitButtonCom";
import {
  confirmBookingSchema,
  type ConfirmBookingInput,
} from "@/validations/confirmBooking";

export default function ConfirmBookingPage() {
  const navigate = useNavigate();
  const { items, clearCartByServiceType, confirmPendingItem } = useCartStore();

  const filteredItems = items.filter(
    (item) => item.serviceType === "thing-to-do"
  );

  const getSubtotal = () => {
    return filteredItems.reduce((acc, item) => {
      const quantity = item.quantity || 1;
      return acc + item.price * quantity;
    }, 0);
  };

  const form = useForm<ConfirmBookingInput>({
    resolver: zodResolver(confirmBookingSchema),
    defaultValues: {
      customerName: "",
      roomNumber: "",
      // email: "",
      // phoneNumber: "",
    },
  });

  if (items.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <p>No appointment to confirm.</p>
        <Button
          onClick={() => navigate({ to: "/wellness-spa" })}
          className="mt-4 bg-base-primary text-card"
        >
          Go back to services
        </Button>
      </div>
    );
  }

  const discountAmount = 0.0;
  const subTotal = getSubtotal();
  const discountedSubtotal = subTotal - discountAmount;
  const serviceChargePercent = 7;
  const serviceCharge = discountedSubtotal * (serviceChargePercent / 100);
  const total = discountedSubtotal + serviceCharge;

  const onSubmit = (data: ConfirmBookingInput) => {
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

    console.log(
      "FormData prepared:",
      JSON.stringify(Object.fromEntries(formData))
    );

    confirmPendingItem?.();
    clearCartByServiceType("thing-to-do");
    navigate({ to: "/success" });
  };

  return (
    <div className="px-4 py-8 space-y-4">
      <div className="flex items-center gap-4 p-4 bg-muted-background rounded-2xl customShadowSm">
        <div className="flex flex-col w-full gap-4">
          <h2 className="text-lg font-bold text-base-secondary">
            Customer Info
          </h2>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-3"
              noValidate
            >
              {/* Customer Name */}
              <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your name"
                        className="w-full py-5"
                        {...field}
                      />
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
                      <Input
                        placeholder="Enter room number"
                        className="w-full py-5"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              {/* <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter email"
                        className="w-full py-5"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              {/* Phone Number */}
              {/* <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter phone number"
                        className="w-full py-5"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </form>
          </Form>
        </div>
      </div>

      <div className="p-4 bg-muted-background rounded-2xl customShadowSm">
        <h3 className="mb-4 text-lg font-bold text-base-secondary">
          Order Items
        </h3>
        <div className="space-y-2">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-2 pb-3 text-sm border-b border-gray-100 last:border-0 last:pb-0"
            >
              <div>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="flex-shrink-0 object-cover rounded-lg w-22 h-22"
                />
              </div>
              <div className="flex flex-col justify-between flex-grow">
                <div>
                  <h4 className="text-base font-semibold">
                    {item.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {item.packageName} Package - {item.category} Type
                  </p>
                  {item.date && (
                    <p className="text-sm text-muted-foreground">
                      {item.time} on {new Date(item.date).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className="flex">
                  <span className="text-base font-semibold text-base-primary">
                    Price: ${item.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-muted-background rounded-2xl customShadowSm">
        <h3 className="mb-2 text-lg font-bold text-base-secondary">
          Price Detail
        </h3>
        <DetailRow label="Subtotal" value={`$${subTotal.toFixed(2)}`} />
        <DetailRow label="Discount" value={`$${discountAmount.toFixed(2)}`} />
        <DetailRow
          label={`Service Charge (${serviceChargePercent}%)`}
          value={`$${serviceCharge.toFixed(2)}`}
        />
        <div className="flex items-center justify-between py-3 mt-2">
          <span className="text-lg font-semibold text-black">Total</span>
          <span className="text-lg font-bold">{`$${total.toFixed(2)}`}</span>
        </div>
      </div>

      <CustomButtonSubmit
        textBtn="Confirm Appointment"
        isLoading={form.formState.isSubmitting}
        onClick={form.handleSubmit(onSubmit)}
      />
    </div>
  );
}
