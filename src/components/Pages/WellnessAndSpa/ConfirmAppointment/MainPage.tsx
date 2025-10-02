import { Button } from "@/components/ui/button";
import { spaItems } from "@/config/data/wellness-spa";
import { format } from 'date-fns';
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { useOrderStore, type OrderItem } from "@/store/CartStore";
import { DetailRow } from "./DetailRow";
import { useNavigate } from "@tanstack/react-router";

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

    const service = spaItems.find(item => item.name === currentItem.serviceName);

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
            <div className="relative flex items-center gap-4 p-4 bg-muted-background rounded-2xl customShadowSm">
                <img src={service?.imageUrl} alt={service?.name} className="object-cover w-24 h-24 rounded-xl" />
                <div>
                    <h2 className="text-lg font-semibold">{currentItem.serviceName}</h2>
                    <p className="text-xs text-muted-foreground">{service?.description}</p>
                </div>
                <Button className="absolute bottom-0 right-0 p-1 rounded-tl-xl rounded-br-xl" variant="destructive" size="icon" onClick={() => removeItem(currentItem.serviceName)}>
                    <Trash2 className="w-4 h-4 text-card" />
                </Button>
            </div>

            <div className="p-4 bg-muted-background rounded-2xl customShadowSm">
                <h3 className="mb-2 text-lg font-bold">Your Order</h3>
                <DetailRow label="Package" value={currentItem.packageName} />
                <DetailRow label="Type" value={currentItem.category} />
                <DetailRow label="Date" value={format(new Date(currentItem.date), "EEEE, dd MMM, yyyy")} />
                <DetailRow label="Hours" value={currentItem.time} />
            </div>

            <div className="p-4 bg-muted-background rounded-2xl customShadowSm">
                <h3 className="mb-2 text-lg font-bold">Price Detail</h3>
                <DetailRow label="Price" value={`$${currentItem.price.toFixed(2)}`} />
                <DetailRow label="Discount" value="$00.00" />
                <DetailRow label="Service charge" value={`${serviceChargePercent}%`} />
                <div className="flex items-center justify-between py-3">
                    <span className="text-muted-foreground">Total</span>
                    <span className="text-xl font-bold">{`$${total.toFixed(2)}`}</span>
                </div>
            </div>

            <Button onClick={handleConfirm} className="w-full h-12 mt-8 bg-base-primary">
                Confirm Appointment
            </Button>
            <div className="pb-8" />
        </div>
    );
}
