import HeaderComponent from "@/components/layout/HeaderComponent";
import OrderDetailsPage from "@/components/Pages/OrdersPage/OrderDetailsPage";
import { Skeleton } from "@/components/ui/skeleton";
import useNavbarStore from "@/store/Navbar";
import type { OrderItems } from "@/types/orderItem";
import post from "@sfutureapps/req-sdk";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/orders/$orderId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { orderId } = Route.useParams();
  const { hide, show } = useNavbarStore((state) => state);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["orderDetail", orderId],
    queryFn: async () =>
      await post({
        endpoint: "sales/get_sale_detail",
        data: {
          id: orderId,
        },
      }),
    enabled: Boolean(orderId),
  });

  useEffect(() => {
    hide();
    return () => {
      show();
    };
  }, [hide, show]);

  const rawOrder = data?.data;
  const sale = rawOrder?.sale;
  const customer = rawOrder?.customer;
  const table = rawOrder?.table;
  const rawItems = Array.isArray(rawOrder?.items) ? rawOrder.items : [];

  const orderData: OrderItems | null = sale
    ? {
        id: String(sale.id ?? orderId),
        name: customer?.name ?? sale.customer ?? "",
        roomNumber: table?.name ?? sale.table_name ?? "",
        orderDate: sale.createtime ? new Date(Number(sale.createtime) * 1000).toLocaleString() : "",
        orderId: String(sale.id ?? orderId),
        totalAmount: Number(sale.total ?? 0),
        category: sale.service_type ?? "",
        imageUrl: rawItems[0]?.image ?? "",
        items: rawItems.map((item: any) => ({
          ...item,
          id: String(item?.id ?? ""),
          price: String(item?.price ?? item?.total ?? 0),
          quantity: Number(item?.qt ?? item?.quantity ?? 1),
          image: item?.image ?? "",
          imageUrl: item?.image ?? "",
          packageName: item?.price_option ?? "",
          time: item?.item_time_booking ?? "",
          serviceType: sale.service_type ?? "",
          description: item?.name ?? "",
          message: "",
          category: 0,
        })),
      }
    : null;

  return (
    <div>
      <HeaderComponent title="Order Details" />
      <main className="h-screen bg-background max-w-md mx-auto w-full">
        {isLoading ? (
          <div className="px-4 py-8 mt-12 space-y-4">
            <Skeleton className="w-full h-28 rounded-2xl" />
            <Skeleton className="w-full h-28 rounded-2xl" />
            <Skeleton className="w-full h-64 rounded-2xl" />
          </div>
        ) : isError ? (
          <p className="px-4 py-8 mt-12 text-center text-muted-foreground">Unable to load order details.</p>
        ) : orderData ? (
          <OrderDetailsPage orderData={orderData} />
        ) : (
          <p className="px-4 py-8 mt-12 text-center text-muted-foreground">Order not found.</p>
        )}
      </main>
    </div>
  );
}
