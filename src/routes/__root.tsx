import { createRootRoute } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoadingProvider from "@/context/LoadingContext";
import AppLayout from "@/components/layout/AppLayout";
import vConsole from "vconsole";

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: RootComponent,
});

if (process.env.NODE_ENV === "development") {
  new vConsole();
}

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <LoadingProvider>
        <AppLayout />
      </LoadingProvider>
    </QueryClientProvider>
  );
}
