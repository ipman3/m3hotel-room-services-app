import { Card, CardContent } from "@/components/ui/card";
import { serviceItems } from "@/config/serviceItems";
import { useNavigate } from "@tanstack/react-router";

export default function ServiceGrid() {
  const navigate = useNavigate();

  const handleServiceClick = (path: string) => {
    navigate({ to: path });
  };

  return (
    <section className="px-4">
      <h2 className="mb-4 text-lg font-bold text-primary">
        Please choose below services
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {serviceItems.map((item) => (
          <Card
            key={item.label}
            className="transition-transform border-none cursor-pointer rounded-2xl customShadowSm active:scale-95"
            onClick={() => handleServiceClick(item.path)}
          >
            <CardContent className="flex flex-col items-center justify-center gap-2">
              <div className="p-0 rounded-full">
                <img
                  src={item.icon}
                  alt={`${item.label} icon`}
                  width={500}
                  height={500}
                  className="object-cover w-16 h-16"
                />
              </div>
              <span className="font-semibold text-center text-primary">
                {item.label}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
