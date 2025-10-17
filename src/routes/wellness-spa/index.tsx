import HeaderComponent from "@/components/layout/HeaderComponent";
import MainPage from "@/components/Pages/WellnessAndSpa/MainPage";
import useNavbarStore from "@/store/Navbar";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/wellness-spa/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { hide, show } = useNavbarStore((state) => state);
  const navigate = useNavigate();
  const service_type = 'wellness-spa';

  useEffect(() => {
    hide();
    return () => {
      show();
    };
  }, [hide, show]);

  const handleNavigateToSupport = () => {
    navigate({ 
      to: "/support", 
      search: { service_type } 
    });
  };

  return (
    <div className="w-full max-w-md min-h-screen mx-auto">
      <HeaderComponent title="Wellness & Spa" showContact={true} onContactClick={handleNavigateToSupport} />
      <main>
        <MainPage />
      </main>
    </div>
  );
}
