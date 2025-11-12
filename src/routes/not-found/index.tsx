import useNavbarStore from "@/store/Navbar";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/not-found/")({
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
    <div className="flex flex-1 flex-col justify-center items-center w-full h-[calc(100vh-4rem)] px-5 text-center">
      You need to <span className="flex items-center justify-center text-2xl">scan QR code</span> 
      to access the menu.
    </div>
  );
}
