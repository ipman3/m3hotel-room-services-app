import { TabBarComponent } from "@/components/TabBarComponent";
import { Link } from "@tanstack/react-router";

interface ServiceThingToDo {
  id: number;
  name: string;
  short_desc: string;
  desc: string;
  image: string;
  images: string[];
  itinerary: string;
  highlight: string;
  price: string;
  unit: string;
  status: string;
  category_id: number;
  sort: number;
}

interface ServiceDetailSheetProps {
  service: ServiceThingToDo;
}


const HtmlContent = ({ html }: { html: string }) => {
  return (
    <div
      className="prose prose-sm max-w-none text-muted-foreground"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default function ServiceDetailSheet({
  service,
}: ServiceDetailSheetProps) {
  const tabs = [
    {
      title: "Highlight",
      content: <HtmlContent html={service.highlight} />,
    },
    {
      title: "Itinerary",
      content: <HtmlContent html={service.itinerary} />,
    },
    {
      title: "Gallery",
      content: (
        <div className="grid grid-cols-3 gap-2">
          {service.images?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${service.name} gallery image ${index + 1}`}
              className="object-cover w-full h-24 rounded-lg"
            />
          ))}
        </div>
      ),
    },
    {
      title: "Information",
      content: (
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            <span className="font-semibold text-foreground">Price:</span> $
            {parseFloat(service.price).toFixed(2)} per {service.unit}
          </p>
          <p>
            <span className="font-semibold text-foreground">Category ID:</span>
            {service.category_id}
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="relative z-10 px-4 py-6 -mt-8 bg-muted-background rounded-t-4xl">
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-base-input rounded-full" />
      <div className="flex items-center justify-between mt-6">
        <h1 className="text-lg font-bold">{service.name}</h1>
          <span className="px-4 py-1.5 text-sm font-semibold rounded-full bg-amber-500/20 text-amber-500 capitalize">
            {service.status}
          </span>
      </div>

      {/* TabBar Section */}
      <div className="mt-6">
        <TabBarComponent tabs={tabs} />
      </div>

      <div className="mt-4">
        <Link
          to="/thing-to-do/booking/$serviceId"
          params={{ serviceId: service.id.toString() }}
          className="w-full px-4 py-3 text-center text-white bg-base-primary rounded-lg customShadowSm font-semibold block"
        >
          Continue Booking
        </Link>
      </div>
    </div>
  );
}
