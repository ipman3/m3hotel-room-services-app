import { TabBarComponent } from "@/components/TabBarComponent";
import { getThingToDoTabs } from "@/config/data/getThingToDoTabs";
import { Link } from "@tanstack/react-router";

interface ServiceThingToDo {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  category: string;
  description: string;
  isPopular: boolean;
  packages: string[];
}

interface ServiceDetailSheetProps {
  service: ServiceThingToDo;
}

export default function ServiceDetailSheet({
  service,
}: ServiceDetailSheetProps) {
  const tabs = getThingToDoTabs();

  return (
    <div className="relative z-10 px-4 py-6 -mt-8 bg-muted-background rounded-t-4xl">
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-base-input rounded-full" />

      <div className="flex items-center justify-between mt-6">
        <h1 className="text-xl font-bold">{service.name}</h1>
        {service.isPopular && (
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-base-accent/20 text-base-accent">
            Popular
          </span>
        )}
      </div>

      {/* TabBar Section */}
      <div className="mt-6">
        <TabBarComponent tabs={tabs} />
      </div>

      <div className="mt-4">
        <Link
          to="/thing-to-do/booking/$serviceId"
          params={{ serviceId: service.id }}
          className="w-full px-4 py-3 text-center text-white bg-base-primary rounded-lg customShadowSm font-semibold block"
        >
          Continue Booking
        </Link>
      </div>
    </div>
  );
}
