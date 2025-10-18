import HeaderComponent from "@/components/layout/HeaderComponent";
import MainPage from "@/components/Pages/NotificationsPage/MainPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/notifications/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <HeaderComponent title="Notifications" showBack={false} />
      <main className="mt-12 max-w-md mx-auto w-full">
        <MainPage />
      </main>
    </div>
  );
}
