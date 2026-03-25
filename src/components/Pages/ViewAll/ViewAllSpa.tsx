import { Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import CategoryFilters from "../WellnessAndSpa/CategoryFilters";
import { useCategoryStore } from "@/store/CategoryStore";
import SkeletonVerticalLoader from "@/components/SkeletonVerticalLoader";
import ErrorState from "@/components/ErrorState";
import { useGetAllSpas } from "@/hooks/wellness-spa/useGetAllSpa";
import { ImageAssets } from "../../../../public/assets/imgs";

export default function ViewAllSpa() {
  const { data: allSpaItems, isLoading, isError } = useGetAllSpas(true);
  const { activeCategory } = useCategoryStore();
  const spaItems = allSpaItems?.data || [];

  const filteredSpaItems =
    activeCategory === null
      ? spaItems
      : spaItems.filter((item) => item.category_id === activeCategory);

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
          filteredSpaItems.map((item) => (
            <Link
              key={item.id}
              to="/wellness-spa/$serviceId"
              params={{ serviceId: item.id.toString() }}
            >
              <Card className="py-4 mb-4 overflow-hidden border-none customShadowSm rounded-xl">
                <CardContent className="flex items-center gap-4 px-4">
                  <img
                    src={item.image || ImageAssets.placeholderService}
                    alt={item.name}
                    className="object-cover w-24 h-24 rounded-xl"
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.src = ImageAssets.placeholderService;
                    }}
                  />
                  <div className="flex-grow">
                    <h3 className="font-bold">{item.name}</h3>
                    <p
                      className="!text-sm text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: item.short_desc }}
                    />
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
