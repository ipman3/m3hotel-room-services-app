import HeaderComponent from "@/components/layout/HeaderComponent";
import MainPage from "@/components/Pages/CartPage/MainPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cart/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <HeaderComponent title="View Cart" showBack={false} />
      <main className="mt-12 max-w-md mx-auto w-full">
        <MainPage />
      </main>
    </div>
  );
}
