import HeaderComponent from "@/components/layout/HeaderComponent";
import PlaceOrderPage from "@/components/Pages/roomservice/PlaceOrder/MainPage";
import useNavbarStore from "@/store/Navbar";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/room-service/place-order/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { hide, show } = useNavbarStore((state) => state);

  useEffect(() => {
    hide();
    return () => {
      show();
    };
  }, [hide, show]);

  return (
    <div>
      <HeaderComponent title="Order Detail" />
      <main className="mt-12">
        <PlaceOrderPage />
      </main>
    </div>
  );
}
