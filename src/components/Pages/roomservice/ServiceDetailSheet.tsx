import ServiceForm from "./ServiceForm";

interface Service {
  name: string;
  price: number;
  category: string;
  description: string;
  isPopular: boolean;
  packages: string[];
}

interface ServiceDetailSheetProps {
  service: Service;
}

export default function ServiceDetailSheet({
  service,
}: ServiceDetailSheetProps) {

  return (
    <div className="relative z-10 px-4 py-6 -mt-8 bg-muted-background rounded-t-4xl">
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-base-input rounded-full" />

      <div className="flex items-center justify-between mt-4">
        <h1 className="text-xl font-bold">{service.name}</h1>
        {service.isPopular && (
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-base-accent/20 text-base-accent">
            Popular
          </span>
        )}
      </div>

      <div className="mt-4">
        <h2 className="font-semibold">Description</h2>
        <p className="mt-1 text-gray-600">{service.description}</p>
      </div>

      {/* Form Section */}
      {/* <ServiceForm packages={service.packages} serviceName={service.name} price={service.price} category={service.category} /> */}
    </div>
  );
}
