import { Outlet, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Toaster } from "sonner";
import SplashScreen from "./SplashScreenComponent";
import BottomNav from "./BottomNavComponent";
import { FloatingCartButton } from "./FloatingCartButton";
import { FlyToCartAnimation } from "../FlyToCartAnimation";
import { useServiceTypeCheck } from "@/hooks/useServiceTypeCheck";

export default function AppLayout() {
  const [isSplashScreen, setIsSplashScreen] = useState<boolean>(true);
  const location = useLocation();
  const { ServiceTypeDialog } = useServiceTypeCheck();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashScreen(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isSplashScreen) {
    return <SplashScreen />;
  }

  const isShowFloatingCartButton = () => {
    const path = location.pathname;

    const hideOnExactPaths = [
      "/room-service/place-order",
      "/wellness-spa/confirm-appointment",
      "/thing-to-do/confirm-booking",
      "/cart",
      "/support",
    ];

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
