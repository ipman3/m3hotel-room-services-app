import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "@tanstack/react-router";
import { GridIcons } from "../../../../public/assets/icons/index";

const serviceItems = [
  {
    icon: GridIcons.roomService,
    label: "Room Service",
    path: "/room-service",
  },
  {
    icon: GridIcons.wellnessSpa,
    label: "Wellness & Spa",
    path: "/spa",
  },
  {
    icon: GridIcons.thingToDo,
    label: "Things to Do",
    path: "/activities",
  },
  {
    icon: GridIcons.support,
    label: "Support",
    path: "/support",
  },
];

export default function ServiceGrid() {
  const navigate = useNavigate();

  const handleServiceClick = (path: string) => {
    navigate({ to: path });
  };

  return (
    <section className="px-4">
      <h2 className="text-lg font-bold text-card-foreground mb-4">
        Please choose below services
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {serviceItems.map((item) => (
          <Card
            key={item.label}
            className="rounded-2xl shadow border-none cursor-pointer active:scale-95 transition-transform"
            onClick={() => handleServiceClick(item.path)}
          >
            <CardContent className="flex flex-col items-center justify-center gap-2">
              <div className="bg-background p-2 rounded-full">
                <img
                  src={item.icon}
                  alt={`${item.label} icon`}
                  className="w-12 h-12 object-contain"
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

