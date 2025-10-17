import HeaderComponent from "@/components/layout/HeaderComponent";
import MainPage from "@/components/Pages/CartPage/MainPage";
import { useCartStore } from "@/store/CartStore";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cart/")({
  component: RouteComponent,
});

function RouteComponent() {
  const cartItems = useCartStore((state) => state.items);
  return (
    <div>
      <HeaderComponent title="View Cart" showBack={false} />
      <main className="mt-12">
        <MainPage items={cartItems} />
      </main>
    </div>
  );
}
