import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import HeaderComponent from '@/components/layout/HeaderComponent';
import useNavbarStore from '@/store/Navbar';
import MainPage from '@/components/Pages/WellnessAndSpa/SearchPage/MainPage';

export const Route = createFileRoute('/wellness-spa/search/')({
  component: SearchRouteComponent,
});

function SearchRouteComponent() {
  const { hide, show } = useNavbarStore((state) => state);

  useEffect(() => {
    hide();
    return () => {
      show();
    };
  }, [hide, show]);

  return (
    <div className="w-full max-w-md min-h-screen mx-auto">
      <HeaderComponent title="Search" />
      <main className="pt-4 mt-12">
        <MainPage />
      </main>
    </div>
  );
}
