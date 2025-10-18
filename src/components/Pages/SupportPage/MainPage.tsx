import { contactLinks } from "@/config/contact";
import { Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

export default function MainPage() {
  return (
    <div className="pt-8 space-y-6">
      {/* <Tabs defaultValue="faq" className="w-full">
        <TabsList className="grid w-full grid-cols-2 gap-2 p-1 px-4 rounded-full bg-muted">
          <TabsTrigger
            value="faq"
            className="transition-all duration-300 rounded-full py-2 customShadowSm data-[state=active]:bg-base-primary data-[state=active]:text-white"
          >
            FAQ
          </TabsTrigger>
          <TabsTrigger
            value="contact"
            className="transition-all duration-300 rounded-full py-2 customShadowSm data-[state=active]:bg-base-primary data-[state=active]:text-white"
          >
            Contact Us
          </TabsTrigger>
        </TabsList>
        <div className="bg-muted-background">
          <TabsContent value="faq">
            <FaqComponent />
          </TabsContent>
          <TabsContent value="contact">
            <ContactUsComponent />
          </TabsContent>
        </div>
      </Tabs> */}
      <div className="px-4">
        {contactLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              to={link.url}
              key={link.label}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Card className="p-4 mb-4 border-none rounded-xl customShadowSm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={Icon} alt="Filter icon" className="w-8 h-8" />
                    <span className="font-semibold">{link.label}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
