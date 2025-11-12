import SpaForm from "./SpaForm";

interface Service {
  id: number;
  name: string;
  short_desc: string;
  desc: string;
  image: string;
  images: string[];
  price: string;
  unit: string;
  status: string;
  category_id: number;
}

interface ServiceDetailSheetProps {
  service: any;
}

export default function ServiceDetailSheet({ service }: ServiceDetailSheetProps) {
  const serviceType = "wellness-spa";

  return (
    <div className="relative z-10 px-4 py-6 -mt-8 bg-background rounded-t-4xl">
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-slate-200 rounded-full" />

      <div className="flex items-center justify-between mt-4">
        <h1 className="text-xl font-bold break-words text-ellipsis overflow-hidden max-w-[80%]">{service.name}</h1>
        <span className="px-4 py-1.5 text-sm font-semibold rounded-full bg-amber-500/20 text-amber-500">{service.status}</span>
      </div>

      <div className="mt-4">
        <h2 className="font-semibold">Description</h2>
        <p className="mt-1 text-sm text-gray-600">{service.desc}</p>
      </div>

      {/* Form Section */}
      <SpaForm
        id={service.id}
        name={service.name}
        desc={service.desc}
        price={service.price}
        category_id={service.category_id}
        serviceType={serviceType}
        image={service.image}
        images={service.images}
        unit={service.unit}
        short_desc={service.short_desc}
      />
    </div>
  );
}
