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
import { spaItems } from "@/config/data/wellness-spa";
import { format } from "date-fns";
import { useCartStore } from "@/store/CartStore";
import { DetailRow } from "./DetailRow";
import { useNavigate } from "@tanstack/react-router";
import {
  confirmAppointmentSchema,
  type ConfirmAppointmentInput,
} from "@/validations/confirmAppointment";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomButtonSubmit } from "@/components/CustomButtonSubmit";

export default function ConfirmAppointmentPage() {
  const navigate = useNavigate();
  const { pendingItem, confirmPendingItem } = useCartStore();

  const form = useForm<ConfirmAppointmentInput>({
    resolver: zodResolver(confirmAppointmentSchema),
    defaultValues: {
      customerName: "",
      roomNumber: "",
    },
  });

  if (!pendingItem) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <p>No appointment to confirm.</p>
        <Button
          variant="link"
          onClick={() => navigate({ to: "/wellness-spa" })}
          className="mt-4 bg-base-primary text-card"
        >
          Go back to services
        </Button>
      </div>
    );
  }

  const service = spaItems.find(
    (item) => item.name === pendingItem.serviceName
  );

  const serviceChargePercent = 7;
  const serviceCharge = pendingItem.price * (serviceChargePercent / 100);
  const total = pendingItem.price + serviceCharge;

  const onSubmit = (data: ConfirmAppointmentInput) => {
    const combinedData = {
      ...data,
      ...pendingItem,
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

    console.log("FormData prepared:", formData);

    confirmPendingItem?.();
    navigate({ to: "/success" });
  };

  return (
    <div className="px-4 py-8 space-y-6">
      <div className="flex items-center gap-4 p-4 bg-muted-background rounded-2xl customShadowSm">
        <div className="flex flex-col w-full gap-4">
          <h2 className="text-lg font-bold text-base-secondary">
            Customer Info Form
          </h2>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-4"
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
                        placeholder="Enter your full name"
                        className="w-full py-6"
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
                        className="w-full py-6"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </div>

      <div className="p-4 bg-muted-background rounded-2xl customShadowSm">
        <h3 className="mb-4 text-lg font-bold">Order Details</h3>
        <div className="flex items-center gap-4 mb-4">
          <img
            src={service?.imageUrl}
            alt={service?.name}
            className="object-cover w-24 h-24 rounded-xl"
          />
          <div>
            <h2 className="text-lg font-semibold">{pendingItem.serviceName}</h2>
            <p className="text-xs text-muted-foreground">
              {service?.description}
            </p>
          </div>
        </div>
        <DetailRow label="Package" value={pendingItem.packageName} />
        <DetailRow label="Type" value={pendingItem.category} />
        <DetailRow
          label="Date"
          value={format(new Date(pendingItem.date), "EEEE, dd MMM, yyyy")}
        />
        <div className="flex items-center justify-between py-3">
          <span className="text-muted-foreground">Hours</span>
          <span className="text-base font-semibold">{pendingItem.time}</span>
        </div>
      </div>

      <div className="p-4 bg-muted-background rounded-2xl customShadowSm">
        <h3 className="mb-2 text-lg font-bold">Price Detail</h3>
        <DetailRow label="Price" value={`$${pendingItem.price.toFixed(2)}`} />
        <DetailRow label="Discount" value="$00.00" />
        <DetailRow label="Service charge" value={`${serviceChargePercent}%`} />
        <div className="flex items-center justify-between py-3">
          <span className="text-muted-foreground">Total</span>
          <span className="text-xl font-bold">{`$${total.toFixed(2)}`}</span>
        </div>
      </div>

      <CustomButtonSubmit
        textBtn="Confirm Appointment"
        isLoading={form.formState.isSubmitting}
        onClick={form.handleSubmit(onSubmit)}
      />

      <div className="pb-8" />
    </div>
  );
}
