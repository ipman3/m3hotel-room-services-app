import { spaItems } from "@/config/data/wellness-spa";
import { type OrderItem } from "@/store/CartStore";

interface CartItemsProps {
    items: OrderItem[];
}

export default function MainPage({ items = [] }: CartItemsProps) {
    if (items.length === 0) {
        return <p className="p-8 text-center text-muted-foreground">Your cart is empty.</p>
    }

    const currentItem = items[0]; 
    const service = spaItems.find(item => item.name === currentItem.serviceName);

    return (
        <div className="px-4 py-8 space-y-6">
          <h2 className="text-lg font-bold text-base-secondary">Order Details</h2>
            <div className="flex items-center gap-4 p-2 bg-white rounded-2xl customShadowSm">
                <img src={service?.imageUrl} alt={service?.name} className="w-24 h-24 object-cover rounded-xl" />
                <div className="flex-grow">
                    <h2 className="font-bold">{currentItem.serviceName}</h2>
                    <p className="text-sm text-muted-foreground">{service?.description.slice(0, 20)}...</p>
                       <p className="text-sm text-base-secondary font-semibold">${service?.price.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
}

