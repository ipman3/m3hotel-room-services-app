import { Outlet } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Toaster } from "sonner";
import SplashScreen from "./SplashScreenComponent";
import BottomNav from "./BottomNavComponent";
import { FloatingCartButton } from "./FloatingCartButton";
import { FlyToCartAnimation } from "../FlyToCartAnimation";

export default function AppLayout() {
  const [isSplashScreen, setIsSplashScreen] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashScreen(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isSplashScreen) {
    return <SplashScreen />;
  }

  return (
    <div className="text-accent-foreground">
      <Toaster position="top-right" theme="light" richColors expand />
      <main className="min-h-screen pb-24 select-none">
        <Outlet />
      </main>
      <BottomNav />
      <FloatingCartButton />
      <FlyToCartAnimation />
    </div>
  );
}
