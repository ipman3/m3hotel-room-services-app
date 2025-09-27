import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import HeaderComponent from '@/components/layout/HeaderComponent';
import useNavbarStore from '@/store/Navbar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from '@/config/faq';

export const Route = createFileRoute('/support/faq')({
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
      <HeaderComponent title="FAQ" />
      <main className="flex-grow px-4 pt-24 overflow-y-auto">
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-muted-background p-4 rounded-xl customShadowSm border-none">
              <AccordionTrigger className="text-left font-semibold hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pt-2 text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </main>
    </div>
  );
}
