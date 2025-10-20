import { Link, useLocation } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { useCategoryStore } from "@/store/CategoryStore";
import { viewAllConfig } from "@/config/viewAllConfig";
import CategoryFilters from "../roomservice/CategoryFilters";

interface ViewAllPageProps {
    id: string;
}

export default function ViewAllRoomService({ id }: ViewAllPageProps) {
    const { activeCategory } = useCategoryStore();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const popularOnly = searchParams.get("popular") === "true";

    const dataset = viewAllConfig[id] ?? { title: "Unknown", items: [] };

    let filteredItems =
        activeCategory === "All"
            ? dataset.items
            : dataset.items.filter((item) => item.category === activeCategory);

    if (popularOnly) {
        filteredItems = filteredItems.filter((item) => item.isPopular);
    }

    return (
        <div className="pt-6">
            <h2 className="px-4 mb-2 text-lg font-bold text-base-accent">
                {dataset.title} {popularOnly ? "- Popular" : ""}
            </h2>

            <CategoryFilters />

            <div className="px-4 pt-6 space-y-4">
                {filteredItems.map((item) => (
                    <Link
                        key={item.id}
                        to="/room-service/$serviceId"
                        params={{ serviceId: item.id }}
                    >
                        <Card className="py-4 mb-4 overflow-hidden border-none customShadowSm rounded-xl">
                            <CardContent className="flex items-center gap-4 px-4">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="object-cover w-24 h-24 rounded-xl"
                                    loading="lazy"
                                />
                                <div className="flex-grow">
                                    <h3 className="font-bold">{item.name}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {item.description.length > 50
                                            ? item.description.slice(0, 50) + "..."
                                            : item.description}
                                    </p>
                                    <p className="mt-1 font-bold">${item.price.toFixed(2)}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
