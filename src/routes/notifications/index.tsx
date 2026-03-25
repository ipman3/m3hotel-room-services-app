import HeaderComponent from "@/components/layout/HeaderComponent";
import MainPage from "@/components/Pages/NotificationsPage/MainPage";
import post from "@sfutureapps/req-sdk";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/notifications/")({
  component: RouteComponent,
});

function RouteComponent() {
  const cust_name = localStorage.getItem("customer_name") || "";
  const { data: notifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () =>
      await post({
        endpoint: "Notification/index",
        data: {
          name: cust_name,
          tableId: localStorage.getItem("table_id"),
        },
      }),
    refetchInterval: 1000,
  });

  return (
    <div>
      <HeaderComponent title="Notifications" showBack={false} />
      <main className="mt-12 max-w-md mx-auto w-full">{notifications && <MainPage notifications={notifications?.data} />}</main>
    </div>
  );
}
