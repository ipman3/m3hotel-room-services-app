import { Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import CategoryFilters from "../roomservice/CategoryFilters";
import { useProductsByStore } from "@/hooks/room-service/useProductsByStore";
import SkeletonVerticalLoader from "@/components/SkeletonVerticalLoader";
import ErrorState from "@/components/ErrorState";

export default function ViewAllRoomService() {
  const storeId = 12;
  const {
    data: allProductsList,
    isLoading,
    isError,
  } = useProductsByStore(storeId);
  const products = allProductsList?.data.data || [];

  return (
    <div className="pt-6">
      <CategoryFilters />

      <div className="px-4 pt-6 space-y-4">
        {isLoading ? (
          [...Array(3)].map((_, index) => (
            <SkeletonVerticalLoader key={index} />
          ))
        ) : isError ? (
          <ErrorState />
        ) : (
          products.map((item) => (
            <Link
              key={item.id}
              to="/room-service/$serviceId"
              params={{ serviceId: item.id.toString() }}
            >
              <Card className="py-4 mb-4 overflow-hidden border-none customShadowSm rounded-xl">
                <CardContent className="flex items-center gap-4 px-4">
                  <img
                    src={item.photo}
                    alt={item.name}
                    className="object-cover w-24 h-24 rounded-xl"
                    loading="lazy"
                  />
                  <div className="flex-grow">
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description && item.description.length > 50
                        ? item.description.slice(0, 50) + "..."
                        : item.description || ""}
                    </p>
                    <p className="mt-1 font-bold">
                      ${parseFloat(item.price).toFixed(2)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
