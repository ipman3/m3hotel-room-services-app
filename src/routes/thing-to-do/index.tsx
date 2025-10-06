
import HeaderComponent from "@/components/layout/HeaderComponent";
import MainPage from "@/components/Pages/thing-to-do/MainPage";

import useNavbarStore from "@/store/Navbar";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/thing-to-do/")({
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
    <div className="w-full max-w-md min-h-screen mx-auto">
      <HeaderComponent title="Thing To Do" />
      <div className="bg-muted-background">
        <MainPage />
      </div>
    </div>
  );
}
