import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import CardItemComponent from "../../CardItemComponent";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import moment from "moment-timezone";
import post from "@/lib/Api";

export default function MainPage() {
  const [activeTab, setActiveTab] = useState("all");
  // const [items] = useState<OrderItems[]>([]);

  const { data: items } = useQuery({
    queryKey: ["ordersList"],
    queryFn: async () =>
      await post({
        endpoint: "/sales/index",
        data: {
          cus_name: localStorage.getItem("customer_name"),
          table_name: localStorage.getItem("table_name"),
        },
      }),
    refetchInterval: 1000,
  });

  // console.log(items);

  const filteredItems = useMemo(() => {
    if (activeTab === "all") return items?.data;
    return items?.data?.filter((item: any) => item.service_type == activeTab);
  }, [items, activeTab]);

  console.log(filteredItems);

  if (items?.data?.length === 0) {
    return <p className="p-8 text-center text-muted-foreground">Your order is empty.</p>;
  }

  const TABS = [
    {
      name: "All",
      val: "all",
    },
    {
      name: "Restaurant",
      val: "restautant",
    },
    {
      name: "Spa",
      val: "spa",
    },
    {
      name: "Tour Package",
      val: "tour_package",
    },
  ];

  return (
    <div className="px-4 py-8 space-y-6">
      <h2 className="text-lg font-bold text-base-secondary">Order Details</h2>

      <div className="flex justify-between pb-2 space-x-2 overflow-x-auto scrollbar-hide">
        {TABS.map((tab) => (
          <Button
            key={tab.val}
            variant={activeTab === tab.val ? "default" : "outline"}
            className={`flex-1 whitespace-nowrap border-none rounded-full transition-all ${
              activeTab === tab.val ? "bg-base-primary text-white" : "text-base-secondary bg-base-input"
            }`}
            onClick={() => setActiveTab(tab.val)}>
            {tab.name}
          </Button>
        ))}
      </div>
      {/* Order List */}
      <div className="mt-4 space-y-4">
        {filteredItems && filteredItems?.length > 0 ? (
          filteredItems?.map((item: any) => (
            <Link key={item.id} to="/orders/$orderId" params={{ orderId: item.id }}>
              <CardItemComponent id={item.id} imageUrl={item.imageUrl} isRemovable={false} className="mb-4">
                <h3 className="font-bold text-base mb-1 break-words">{item.items?.[0]?.name}</h3>
                <div className="flex items-center justify-start gap-3 space-y-[5px]">
                  <div className="w-[100px] h-[100px]">
                    <img className="w-full h-full overflow-hidden" src="/assets/imgs/room-icon.png" alt="" />
                  </div>
                  <div className="flex flex-col justify-start">
                    <h3 className="font-semibold">Name: </h3>
                    <h3 className="font-semibold">Room: </h3>
                    <h3 className="font-semibold">Order Date: </h3>
                    <h3 className="font-semibold">Order ID: </h3>
                    <h3 className="font-semibold">Total: </h3>
                  </div>

                  <div className="flex flex-1 flex-col justify-end items-end mr-3">
                    <p className="text-start">{item?.customer}</p>
                    <p className="text-start">{item?.table_name}</p>
                    <p className="text-start">{moment(item?.orderDate).format("YYYY-MM-DD HH:mm")}</p>
                    <p className="text-start">#{item?.ref_id}</p>
                    <p className="text-start">${parseFloat(item.total).toFixed(2)}</p>
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
