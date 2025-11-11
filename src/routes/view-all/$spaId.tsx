import HeaderComponent from "@/components/layout/HeaderComponent";
import ViewAllSpa from "@/components/Pages/ViewAll/ViewAllSpa";
import useNavbarStore from "@/store/Navbar";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/view-all/$spaId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    return {
      spaId: params.spaId,
    };
  },
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
      <HeaderComponent title="View All" />
      <main className="mt-12 max-w-md mx-auto w-full">
        <ViewAllSpa />
      </main>
    </div>
  );
}
