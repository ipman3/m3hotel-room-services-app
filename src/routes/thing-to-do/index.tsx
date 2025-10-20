import HeaderComponent from "@/components/layout/HeaderComponent";
import MainPage from "@/components/Pages/thing-to-do/MainPage";

import useNavbarStore from "@/store/Navbar";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/thing-to-do/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { hide, show } = useNavbarStore((state) => state);
  const navigate = useNavigate();
  const service_type = "thing-to-do";

  useEffect(() => {
    hide();
    return () => {
      show();
    };
  }, [hide, show]);

  const handleNavigateToSupport = () => {
    navigate({
      to: "/support",
      search: { service_type },
    });
  };

  return (
    <div className="w-full max-w-md min-h-screen mx-auto">
      <HeaderComponent
        title="Thing To Do"
        showContact={true}
        onContactClick={handleNavigateToSupport}
      />
      <div className="bg-muted-background">
        <MainPage />
      </div>
    </div>
  );
}
