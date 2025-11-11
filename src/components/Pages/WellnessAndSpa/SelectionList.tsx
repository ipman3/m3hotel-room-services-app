import ErrorState from "@/components/ErrorState";
import SkeletonVerticalLoader from "@/components/SkeletonVerticalLoader";
import { Card, CardContent } from "@/components/ui/card";
import { usePathId } from "@/hooks/usePathId";
import { useTopSelectionSpas } from "@/hooks/wellness-spa/useTopSelectionSpa";
import { containerVariants, itemVariants } from "@/lib/variantsAnimation";
import { useCategoryStore } from "@/store/CategoryStore";
import post from "@sfutureapps/req-sdk";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
<<<<<<< HEAD
import { useMemo } from "react";
=======
>>>>>>> origin/Bunheng-Dev

export default function SelectionList() {
  const { activeCategory } = useCategoryStore();
  const { data: topSelectionSpas, isLoading, isError } = useTopSelectionSpas();
  const topSelectionSpa = topSelectionSpas?.data || [];
  const viewId = usePathId("/wellness-spa/");

<<<<<<< HEAD
  const { data: spas } = useQuery({
    queryKey: ["top_selection", "spa"],
    queryFn: async () =>
      await post({
        endpoint: "spa/topSelectionItems",
      }),
  });

  const filteredItems = useMemo(() => {
    if (!spas) return [];
    return activeCategory === "All" ? spas?.data : spas?.data?.filter((i: any) => i.category_id === activeCategory);
  }, [spas, activeCategory]);

  const viewId = usePathId("/wellness-spa/");
=======
  const filteredItems =
    activeCategory === null
      ? topSelectionSpa
      : topSelectionSpa.filter((item) => item.category_id === activeCategory);
>>>>>>> origin/Bunheng-Dev

  return (
    <section className="px-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-card-foreground">Selection</h2>
<<<<<<< HEAD
        <Link to="/view-all/$viewId" params={{ viewId }}>
          <span className="text-sm font-semibold cursor-pointer text-base-accent">View All</span>
        </Link>
      </div>
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        {filteredItems &&
          filteredItems?.map((item: any) => (
            <motion.div key={item.id} variants={itemVariants}>
              <Link to="/wellness-spa/$serviceId" params={{ serviceId: item?.id }}>
                <Card className="py-4 mb-4 overflow-hidden border-none customShadowSm rounded-xl scroll-animate">
                  <CardContent className="flex items-center gap-4 px-4">
                    <img src={item.image} alt={item?.name} className="object-cover w-24 h-24 rounded-xl" loading="lazy" />
                    <div className="flex-grow">
                      <h3 className="font-bold">{item?.name}</h3>
                      <p className="text-sm text-muted-foreground !line-clamp-2" dangerouslySetInnerHTML={{ __html: item?.desc }}></p>
                      <p className="mt-1 font-bold">${parseFloat(item?.price).toFixed(2)}</p>
=======
        <Link to="/view-all/$spaId" params={{ spaId: viewId }}>
          <span className="text-sm font-semibold cursor-pointer text-base-accent">
            View All
          </span>
        </Link>
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {isLoading ? (
          [...Array(8)].map((_, index) => (
            <SkeletonVerticalLoader key={index} />
          ))
        ) : isError ? (
          <ErrorState />
        ) : (
          filteredItems.slice(0, 12).map((item) => (
            <motion.div key={item.id} variants={itemVariants}>
              <Link
                to="/wellness-spa/$serviceId"
                params={{ serviceId: item.id.toString() }}
              >
                <Card className="py-4 mb-4 overflow-hidden border-none customShadowSm rounded-xl scroll-animate">
                  <CardContent className="flex items-center gap-4 px-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-24 h-24 rounded-xl"
                      loading="lazy"
                    />
                    <div className="flex-grow">
                      <h3 className="font-bold">{item.name.replace("_", " ")}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.desc.length > 30
                          ? item.desc.slice(0, 30) + "..."
                          : item.desc}
                      </p>
                      <p className="mt-1 font-bold">
                        ${parseFloat(item.price).toFixed(2)}
                      </p>
>>>>>>> origin/Bunheng-Dev
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
<<<<<<< HEAD
          ))}
=======
          ))
        )}
>>>>>>> origin/Bunheng-Dev
      </motion.div>
    </section>
  );
}
