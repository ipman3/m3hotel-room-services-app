
import HomeHeader from '@/components/Pages/HomePage/HomeHeader';
import OffersCarousel from '@/components/Pages/HomePage/OffersCarousel';
import ServiceGrid from '@/components/Pages/HomePage/ServiceGrid';
import MainMenu from '@/components/MainMenu'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <div className="flex flex-col justify-center w-full max-w-md min-h-screen mx-auto bg-muted-background">
      <HomeHeader />
      <MainMenu />
      <div className="pt-6 space-y-6">
        <ServiceGrid />
        <OffersCarousel />
      </div>

      <div className='pb-8' />
    </div>
  );
}