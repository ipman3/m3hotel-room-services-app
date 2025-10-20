import { Button } from "@/components/ui/button";
import { serviceItems } from "@/config/data/room-service";
import { format } from "date-fns";
import { toast } from "sonner";
import { useCartStore } from "@/store/CartStore";
import { DetailRow } from "./DetailRow";
import { useNavigate } from "@tanstack/react-router";
import ConfirmAppointment from "./ConfirmAppointment";

export default function ConfirmAppointmentPage() {
  const navigate = useNavigate();
  const { pendingItem, confirmPendingItem } = useCartStore();

  if (!pendingItem) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <p>No appointment to confirm.</p>
        <Button variant="link" onClick={() => navigate({ to: "/room-service" })}>
          Go back to services
        </Button>
      </div>
    );
  }

  const service = serviceItems.find((item) => item.name === pendingItem.serviceName);

  const serviceChargePercent = 7;
  const serviceCharge = pendingItem.price * (serviceChargePercent / 100);
  const total = pendingItem.price + serviceCharge;

  const handleConfirm = () => {
    confirmPendingItem();
    console.log("Appointment Confirmed:", pendingItem);
    toast.success("Your appointment has been confirmed and saved!");
    navigate({ to: "/success" });
  };

  return (
    <div className="px-4 py-8 space-y-6">
      {/* Service Summary */}
      <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm">
        <img src={service?.image} alt={service?.name} className="object-cover w-24 h-24 rounded-xl" />
        <div>
          <h2 className="text-lg font-semibold">{pendingItem.serviceName}</h2>
          <p className="text-xs text-muted-foreground">{service?.description}</p>
        </div>
      </div>

      {/* Order Details */}
      <div className="p-4 bg-white rounded-2xl shadow-sm">
        <h3 className="mb-2 text-lg font-bold">Your Order</h3>
        <DetailRow label="Package" value={pendingItem.packageName} />
        <DetailRow label="Type" value={pendingItem.category} />
        <DetailRow label="Date" value={format(new Date(pendingItem.date), "EEEE, dd MMM, yyyy")} />
        <DetailRow label="Hours" value={pendingItem.time} />
      </div>

      {/* Price Details */}
      <div className="p-4 bg-white rounded-2xl shadow-sm">
        <h3 className="mb-2 text-lg font-bold">Price Detail</h3>
        <DetailRow label="Price" value={`$${pendingItem.price.toFixed(2)}`} />
        <DetailRow label="Discount" value="$00.00" />
        <DetailRow label="Service charge" value={`${serviceChargePercent}%`} />
        <div className="flex items-center justify-between py-3">
          <span className="text-muted-foreground">Total</span>
          <span className="text-xl font-bold">{`$${total.toFixed(2)}`}</span>
        </div>
      </div>

      {/* Confirm Button */}
      <Button onClick={handleConfirm} className="w-full h-12 mt-8 bg-base-primary">
        Confirm Appointment
      </Button>
      <div className="pb-8" />
    </div>
  );
}
