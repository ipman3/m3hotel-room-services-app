import { Button } from "@/components/ui/button";
import { format } from 'date-fns';
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { useOrderStore, type OrderItem } from "@/store/CartStore";
import { DetailRow } from "./DetailRow";
import { useNavigate } from "@tanstack/react-router";
import { serviceItems } from "@/config/data/room-service";

interface ConfirmAppointmentPageProps {
    items: OrderItem[];
}

export default function ConfirmAppointmentPage({ items }: ConfirmAppointmentPageProps) {
    const navigate = useNavigate();
    const { removeItem } = useOrderStore();

    if (items.length === 0) {
        return <p className="p-8 text-center text-muted-foreground">Your cart is empty.</p>
    }

    const currentItem = items[0];

    const service = serviceItems.find(item => item.name === currentItem.serviceName);

    const serviceChargePercent = 7;
    const serviceCharge = currentItem.price * (serviceChargePercent / 100);
    const total = currentItem.price + serviceCharge;

    const handleConfirm = () => {
        console.log("Appointment Confirmed:", currentItem);
        toast.success("Your appointment has been confirmed!");

        navigate({ to: '/success' })
    };

    return (
        <div className="px-4 py-8 space-y-6">
            <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm">
                <img src={service?.imageUrl} alt={service?.name} className="w-24 h-24 object-cover rounded-xl" />
                <div>
                    <h2 className="text-xl font-bold">{currentItem.serviceName}</h2>
                    <p className="text-sm text-muted-foreground">{service?.description}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeItem(currentItem.serviceName)}>
                    <Trash2 className="w-5 h-5 text-red-500" />
                </Button>
            </div>

            <div className="p-4 bg-white rounded-2xl shadow-sm">
                <h3 className="text-lg font-bold mb-2">Your Order</h3>
                <DetailRow label="Package" value={currentItem.packageName} />
                <DetailRow label="Type" value={currentItem.category} />
                <DetailRow label="Date" value={format(new Date(currentItem.date), "EEEE, dd MMM, yyyy")} />
                <DetailRow label="Hours" value={currentItem.time} />
            </div>

            <div className="p-4 bg-white rounded-2xl shadow-sm">
                <h3 className="text-lg font-bold mb-2">Price Detail</h3>
                <DetailRow label="Price" value={`$${currentItem.price.toFixed(2)}`} />
                <DetailRow label="Discount" value="$00.00" />
                <DetailRow label="Service charge" value={`${serviceChargePercent}%`} />
                <div className="flex justify-between items-center py-3">
                    <span className="text-muted-foreground">Total</span>
                    <span className="font-bold text-xl">{`$${total.toFixed(2)}`}</span>
                </div>
            </div>

            <Button onClick={handleConfirm} className="w-full bg-base-primary h-12 mt-8">
                Confirm Appointment
            </Button>
            <div className="pb-8" />
        </div>
    );
}
