import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import type { OrderItems } from "@/types/orderItem";
import CardItemComponent from "../../CardItemComponent";
import { mockOrders, TABS } from "@/config/data/orders";
import { Link } from "@tanstack/react-router";

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
            <Link
              key={item.id}
              to="/orders/$orderId"
              params={{ orderId: item.id }}
            >
              <CardItemComponent
                id={item.id}
                imageUrl={item.imageUrl}
                isRemovable={false}
                className="mb-4"
              >
                <h3 className="font-bold text-lg mb-2">
                  {item.items?.[0]?.serviceName}
                </h3>
                <div className="flex items-center justify-between space-y-0.5">
                  <div className="flex flex-col justify-start">
                    <h3 className="font-semibold">Order Date: </h3>
                    <h3 className="font-semibold">Order ID: </h3>
                    <h3 className="font-semibold">Total: </h3>
                  </div>

                  <div className="flex flex-col justify-start">
                    <p className="text-start">{item.orderDate}</p>
                    <p className="text-start">#{item.orderId}</p>
                    <p className="text-start">${item.totalAmount.toFixed(2)}</p>
                  </div>
                </div>
              </CardItemComponent>
            </Link>
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
