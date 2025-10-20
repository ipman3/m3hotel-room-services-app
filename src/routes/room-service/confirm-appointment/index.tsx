import HeaderComponent from "@/components/layout/HeaderComponent";
import ConfirmAppointmentPage from "@/components/Pages/roomservice/ConfirmAppointment/MainPage";
import useNavbarStore from "@/store/Navbar";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/room-service/confirm-appointment/")({
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
        <ConfirmAppointmentPage />
      </main>
    </div>
  );
}
