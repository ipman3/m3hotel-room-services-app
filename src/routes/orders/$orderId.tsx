import HeaderComponent from "@/components/layout/HeaderComponent";
import useNavbarStore from "@/store/Navbar";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/orders/$orderId")({
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
      <HeaderComponent title="Order Details" />
      <main className="h-screen bg-background max-w-md mx-auto w-full">
        {/* <OrderDetailsPage orderData={orderData} /> */}
      </main>
    </div>
  );
}
