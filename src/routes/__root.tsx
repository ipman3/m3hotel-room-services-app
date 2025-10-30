import { createRootRoute } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import LoadingProvider from '@/context/LoadingContext';
import AppLayout from '@/components/layout/AppLayout';

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <LoadingProvider>
        <AppLayout />
      </LoadingProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

