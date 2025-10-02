import { Button } from "@/components/ui/button";
import { spaItems } from "@/config/data/wellness-spa";
import { useOrderStore, type OrderItem } from "@/store/CartStore";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

interface CartItemsProps {
    items: OrderItem[];
}

export default function MainPage({ items = [] }: CartItemsProps) {
    const { clearCart, removeItem } = useOrderStore();

    if (items.length === 0) {
        return <p className="p-8 text-center text-muted-foreground">Your cart is empty.</p>
    }

    const handleClearCart = () => {
        clearCart();
        toast.success("Your cart has been cleared.");
    };

    return (
        <div className="px-4 py-8 space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-base-secondary">Order Details</h2>
                <Button variant="link" className="h-auto p-0 text-red-500" onClick={handleClearCart}>
                    Clear All
                </Button>
            </div>
            <div className="space-y-4">
                {items.map((currentItem) => {
                    const service = spaItems.find(s => s.name === currentItem.serviceName);
                    return (
                        <div key={`${currentItem.id}-${currentItem.packageName}`} className="flex items-center gap-4 p-2 bg-white rounded-2xl customShadowSm">
                            <img src={service?.imageUrl} alt={service?.name} className="object-cover w-24 h-24 rounded-xl" />
                            <div className="flex-grow">
                                <h2 className="font-bold">{currentItem.serviceName}</h2>
                                <p className="text-sm text-muted-foreground">{service?.description.slice(0, 20)}...</p>
                                <p className="text-sm font-semibold text-base-secondary">${currentItem.price.toFixed(2)}</p>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => removeItem(currentItem.id)} aria-label="Remove item">
                                <Trash2 className="w-5 h-5 text-red-500" />
                            </Button>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
