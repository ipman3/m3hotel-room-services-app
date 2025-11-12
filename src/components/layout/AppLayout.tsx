import { Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Toaster } from "sonner";
import SplashScreen from "./SplashScreenComponent";
import BottomNav from "./BottomNavComponent";
import { FloatingCartButton } from "./FloatingCartButton";
import { FlyToCartAnimation } from "../FlyToCartAnimation";
import { useServiceTypeCheck } from "@/hooks/useServiceTypeCheck";
import { useMutation } from "@tanstack/react-query";
import post from "@/lib/Api";

export default function AppLayout() {
  const [isSplashScreen, setIsSplashScreen] = useState<boolean>(true);
  const location = useLocation();
  const { ServiceTypeDialog } = useServiceTypeCheck();

  const params = new URLSearchParams(location.search);
  const pathname = location.pathname;
  const navigate = useNavigate();

  const { mutate: getTableInfo } = useMutation({
    mutationKey: ["getTableInfo"],
    mutationFn: async ({ store_id, table_id }: { store_id: string; table_id: string }) =>
      await post({
        endpoint: "/index/getTableInfo",
        data: {
          storeId: store_id,
          tableId: table_id,
        },
      }),
  });

  const checkTableInfo = () => {
    const _table_id = localStorage.getItem("table_id");
    const _store_id = localStorage.getItem("store_id");
    if (!_table_id || !_store_id) {
      navigate({ to: "/not-found" });
      return;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashScreen(false);

      const store_id = params.get("store_id");
      const table_id = params.get("table_id");

      if (store_id && table_id) {
        getTableInfo(
          { store_id, table_id },
          {
            onSuccess(data) {
              if (data && data.code == 1) {
                // Table info fetched successfully
                // console.log("Table info:", data.data);
                localStorage.setItem("store_id", data?.data?.store_id);
                localStorage.setItem("table_id", data?.data?.id);
                localStorage.setItem("table_name", data?.data?.name);

                navigate({ to: "/" });
                return;
              }
            },
            onSettled() {
              checkTableInfo();
            },
          }
        );
      } else {
        checkTableInfo();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [params, pathname]);

  if (isSplashScreen) {
    return <SplashScreen />;
  }

  const isShowFloatingCartButton = () => {
    const path = location.pathname;

    const hideOnExactPaths = ["/room-service/place-order", "/wellness-spa/confirm-appointment", "/thing-to-do/confirm-booking", "/cart", "/support"];

    const hideOnDynamicPatterns = [/^\/orders\/[^/]+$/];

    if (hideOnExactPaths.includes(path)) return false;

    return !hideOnDynamicPatterns.some((pattern) => pattern.test(path));
  };

  return (
    <div className="text-accent-foreground max-w-md mx-auto min-h-screen">
      {ServiceTypeDialog}

      <Toaster position="top-right" theme="light" richColors expand />
      <main className="min-h-screen pb-24 select-none">
        <Outlet />
      </main>
      <BottomNav />
      {isShowFloatingCartButton() && <FloatingCartButton />}
      <FlyToCartAnimation />
    </div>
  );
}
