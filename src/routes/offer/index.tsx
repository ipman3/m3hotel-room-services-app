import HeaderComponent from "@/components/layout/HeaderComponent";
import MainPage from "@/components/Pages/Offer/MainPage";
import useNavbarStore from "@/store/Navbar";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/offer/")({
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
      <HeaderComponent title="Offers & News" />
      <main dangerouslySetInnerHTML={{__html: item.description}} className="pt-16 pb-4 max-w-md mx-auto w-full">
        <MainPage />
      </main>

      <p dangerouslySetInnerHTML={{__html: item.description}}  ></p>
    </div>
  );
}
