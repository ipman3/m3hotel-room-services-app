import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import type { OrderItems } from "@/types/orderItem";
import CardItemComponent from "../../CardItemComponent";

const mockOrders: OrderItems[] = [
  {
    id: "1",
    name: "Johny Wick",
    roomNumber: "302",
    orderDate: "2025-10-17",
    orderId: "ORD-001",
    totalAmount: 49.99,
    category: "Wellness & Spa",
    imageUrl:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80",
  },
  {
    id: "2",
    name: "Johny Wick",
    roomNumber: "302",
    orderDate: "2025-10-17",
    orderId: "ORD-002",
    totalAmount: 19.99,
    category: "Room Service",
    imageUrl:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80",
  },
  {
    id: "3",
    name: "Johny Wick",
    roomNumber: "305",
    orderDate: "2025-10-17",
    orderId: "ORD-003",
    totalAmount: 79.99,
    category: "Thing To Do",
    imageUrl:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80",
  },
];

const TABS = ["All", "Room Service", "Wellness & Spa", "Thing To Do"];

export default function MainPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [items] = useState<OrderItems[]>(mockOrders);

  const filteredItems = useMemo(() => {
    if (activeTab === "All") return items;
    return items.filter((item) => item.category === activeTab);
  }, [items, activeTab]);

  if (items.length === 0) {
    return (
      <p className="p-8 text-center text-muted-foreground">
        Your order is empty.
      </p>
    );
  }

  return (
    <div className="px-4 py-8 space-y-6">
      <h2 className="text-lg font-bold text-base-secondary">Order Details</h2>

      <div className="flex justify-between pb-2 space-x-2 overflow-x-auto scrollbar-hide">
        {TABS.map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "default" : "outline"}
            className={`flex-1 whitespace-nowrap rounded-full transition-all ${
              activeTab === tab
                ? "bg-base-primary text-white"
                : "text-base-secondary"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Button>
        ))}
      </div>

      {/* Order List */}
      <div className="mt-4 space-y-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <CardItemComponent
              key={item.id}
              id={item.id}
              imageUrl={item.imageUrl}
              isRemovable={false}>
              <p>
                <span className="font-semibold">Order Date: </span>
                {item.orderDate}
              </p>
              <p>
                <span className="font-semibold">Order ID: </span> #{item.orderId}
              </p>
              <p>
                <span className="font-semibold">Customer: </span> {item.name}
              </p>
              <p>
                <span className="font-semibold">Room: </span> {item.roomNumber}
              </p>
              <p>
                <span className="font-semibold">Total: </span> $
                {item.totalAmount.toFixed(2)}
              </p>
            </CardItemComponent>
          ))
        ) : (
          <p className="mt-6 text-center text-base-secondary">
            No items found for <strong>{activeTab}</strong>.
          </p>
        )}
      </div>
    </div>
  );
}
