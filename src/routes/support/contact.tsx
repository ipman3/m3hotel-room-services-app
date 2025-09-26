import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect } from 'react';

import HeaderComponent from '@/components/layout/HeaderComponent';
import useNavbarStore from '@/store/Navbar';
import { Card } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import { contactLinks } from '@/config/contact';

export const Route = createFileRoute('/support/contact')({
  component: RouteComponent,
});

function RouteComponent() {
  const { hide, show } = useNavbarStore((state) => state);

  useEffect(() => {
    hide();
    return () => {
      show();
    };
  }, [hide, show]);

  return (
    <div className="flex flex-col h-screen bg-background">
      <HeaderComponent title="Contact Us" />
      <main className="flex-grow px-4 pt-24 overflow-y-auto">
        <div>
          {contactLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link to={link.url} key={link.label} target="_blank" rel="noopener noreferrer">
                <Card className="p-4 rounded-xl customShadowSm border-none bg-muted-background mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Icon className="w-6 h-6 text-base-secondary" />
                      <span className="font-semibold">{link.label}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
