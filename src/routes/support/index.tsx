import HeaderComponent from "@/components/layout/HeaderComponent";
import MainPage from "@/components/Pages/SupportPage/MainPage";
import useNavbarStore from "@/store/Navbar";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/support/")({
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
      <HeaderComponent title="Help & Support" />
      <main className="mt-12">
        <MainPage />
      </main>
    </div>
  );
}
