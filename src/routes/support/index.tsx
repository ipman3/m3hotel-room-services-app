import HeaderComponent from '@/components/layout/HeaderComponent';
import MainPage from '@/components/Pages/SupportPage/MainPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/support/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
      <div>
        <HeaderComponent title="Help & Support" showBack={false} />
        <main className="mt-12">
          <MainPage />
        </main>
      </div>
    );
}
