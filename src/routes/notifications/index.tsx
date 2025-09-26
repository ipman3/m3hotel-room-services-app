import HeaderComponent from '@/components/layout/HeaderComponent';
import MainPage from '@/components/Pages/NotificationsPage/MainPage';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/notifications/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
     <div>
          <HeaderComponent title="View Order" showBack={false} />
          <main className="mt-12">
            <MainPage />
          </main>
        </div>
  );
}
