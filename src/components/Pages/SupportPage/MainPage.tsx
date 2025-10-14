import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FaqComponent from "./FAQ";
import ContactUsComponent from "./Contact";

export default function MainPage() {
  return (
    <div className="pt-8 space-y-6 bg-muted-background">
      <Tabs defaultValue="faq" className="w-full">
        <TabsList className="grid w-full grid-cols-2 gap-2 bg-muted p-1 rounded-full px-4">
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
      </Tabs>
    </div>
  );
}
