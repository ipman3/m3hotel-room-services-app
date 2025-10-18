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
      <h2 className="mb-4 text-lg font-bold text-card-foreground">
        Please choose below services
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {serviceItems.map((item) => (
          <Card
            key={item.label}
            className="transition-transform border-none cursor-pointer rounded-2xl customShadowSm active:scale-95"
            onClick={() => handleServiceClick(item.path)}
          >
            <CardContent className="flex flex-col items-center justify-center gap-2">
              <div className="p-2 rounded-full bg-gray-100">
                <img
                  src={item.icon}
                  alt={`${item.label} icon`}
                  className="object-contain w-12 h-12"
                />
              </div>
              <span className="font-semibold text-center text-card-foreground">
                {item.label}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

