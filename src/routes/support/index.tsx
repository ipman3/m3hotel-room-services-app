import HeaderComponent from "@/components/layout/HeaderComponent";
import MainPage from "@/components/Pages/SupportPage/MainPage";
import useNavbarStore from "@/store/Navbar";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import * as z from 'zod';

const supportSearchSchema = z.object({
  service_type: z.string().optional().catch(undefined),
});

export const Route = createFileRoute("/support/")({
  validateSearch: supportSearchSchema,
  component: RouteComponent,
});

function RouteComponent() {
  const { service_type } = Route.useSearch();
  const { hide, show } = useNavbarStore((state) => state);

  useEffect(() => {
    if (service_type) {
      console.log("Arrived at support page for service type:", service_type);
    } else {
      console.log("Arrived at general support page");
    }
    hide();
    return () => {
      show();
    };
  }, [hide, show, service_type]);
  
  return (
    <div>
      <HeaderComponent title="Help & Support" />
      <main className="mt-12">
        <MainPage />
      </main>
    </div>
  );
}
