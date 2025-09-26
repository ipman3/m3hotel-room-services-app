import HeaderComponent from "@/components/layout/HeaderComponent";
import ConfirmAppointmentPage from "@/components/Pages/WellnessAndSpa/ConfirmAppointment/MainPage";
import { useOrderStore } from "@/store/CartStore";
import useNavbarStore from "@/store/Navbar";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/confirm-appointment/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { hide, show } = useNavbarStore((state) => state);
  const orderItems = useOrderStore((state) => state.items);

  useEffect(() => {
    hide();
    return () => {
      show();
    };
  }, [hide, show]);

   return (
        <div>
          <HeaderComponent title="Confirm Appointment" />
          <main className="mt-12">
            <ConfirmAppointmentPage items={orderItems} />
          </main>
        </div>
      );
}
