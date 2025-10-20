import HeaderComponent from "@/components/layout/HeaderComponent";
import ConfirmBookingPage from "@/components/Pages/thing-to-do/ConfirmBooking/MainPage";
import useNavbarStore from "@/store/Navbar";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/thing-to-do/confirm-booking/")({
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
      <HeaderComponent title="Confirm Booking" />
      <main className="mt-12">
        <ConfirmBookingPage />
      </main>
    </div>
  );
}
