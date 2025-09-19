import { createRootRoute } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
    </QueryClientProvider>
  )
}

