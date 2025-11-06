import { Card, CardContent } from "@/components/ui/card";
import { usePathId } from "@/hooks/usePathId";
import { containerVariants, itemVariants } from "@/lib/variantsAnimation";
import { useCategoryStore } from "@/store/CategoryStore";
import { useQuery } from "@tanstack/react-query";
import post from "@sfutureapps/req-sdk";
import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

export default function PopularSpaSection() {
  const { activeCategory } = useCategoryStore();

  // const filteredPopular =
  //   activeCategory === "All" ? spaItems.filter((i: any) => i.isPopular) : spaItems.filter((i: any) => i.isPopular && i.category_id === activeCategory);

  // const {data} = spaItems;
  const { data: spas } = useQuery({
    queryKey: ["popular", "spa"],
    queryFn: async () =>
      await post({
        endpoint: "spa/popularItems",
      }),
  });

  const filteredPopular = useMemo(() => {
    if (!spas) return [];
    return activeCategory === "All" ? spas?.data : spas?.data?.filter((i: any) => i.category_id === activeCategory);
  }, [spas, activeCategory]);

  const viewId = usePathId("/wellness-spa/");

  // console.log(filteredPopular, activeCategory);

  return (
    <section>
      <div className="flex items-center justify-between px-4 mb-4">
        <h2 className="text-lg font-bold text-card-foreground">Most popular spa</h2>
        <Link to="/view-all/$viewId" params={{ viewId }} search={{ popular: "true" }}>
          <span className="text-sm font-semibold cursor-pointer text-base-accent">View All</span>
        </Link>
      </div>

      <motion.div
        className="flex gap-4 pb-3 pr-4 ml-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        variants={containerVariants}
        initial="hidden"
        animate="visible">
        {filteredPopular &&
          filteredPopular?.map((item: any) => (
            <motion.div key={item?.id} variants={itemVariants}>
              <Link to="/wellness-spa/$serviceId" params={{ serviceId: item?.id }} className="snap-start">
                <Card className="flex-shrink-0 w-40 p-0 border-none customShadowSm rounded-xl">
                  <CardContent className="p-0">
                    <img src={item?.image} alt={item?.name} className="object-cover w-full h-24 rounded-t-xl" loading="lazy" />
                    <div className="px-2 py-4">
                      <h3 className="font-semibold truncate">{item?.name}</h3>
                      <p className="text-sm font-bold text-gray-800">${parseFloat(item?.price).toFixed(2)}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
      </motion.div>
    </section>
  );
}
