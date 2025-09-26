import HeaderComponent from "@/components/layout/HeaderComponent";
import CartPage from "@/components/Pages/CartPage/MainPage";
import { useOrderStore } from "@/store/CartStore";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/Cart/")({
  component: RouteComponent,
});

function RouteComponent() {
  const orderItems = useOrderStore((state) => state.items);
  return (
    <div>
      <HeaderComponent title="View Order" showBack={false} />
      <main className="mt-12">
        <CartPage items={orderItems} />
      </main>
    </div>
  );
}
