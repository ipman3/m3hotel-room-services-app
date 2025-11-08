import ErrorState from "@/components/ErrorState";
import SkeletonVerticalLoader from "@/components/SkeletonVerticalLoader";
import { Card, CardContent } from "@/components/ui/card";
import { useTopSelectionThing } from "@/hooks/thing-to-do/useTopSelectionThing";
import { usePathId } from "@/hooks/usePathId";
import { containerVariants, itemVariants } from "@/lib/variantsAnimation";
import { useCategoryStore } from "@/store/CategoryStore";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

export default function SelectionList() {
  const { activeCategory } = useCategoryStore();
  const {
    data: topSelectionThings,
    isLoading,
    isError,
  } = useTopSelectionThing();
  const thingItemsData = topSelectionThings?.data || [];
  const thingId = usePathId("/thing-to-do/");

  const filteredItems =
    activeCategory === null
      ? thingItemsData
      : thingItemsData.filter((item) => item.category_id === activeCategory);

  return (
    <section className="px-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold text-card-foreground">Selection</h2>
        <Link to="/view-all/$thingId" params={{ thingId }}>
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
                to="/thing-to-do/$thingId"
                params={{ thingId: item.id.toString() }}
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
                      <h3 className="font-bold">
                        {item.name.replace("_", " ")}
                      </h3>
                      <p dangerouslySetInnerHTML={{ __html: item.desc }} />
                      <p className="mt-1 font-bold">
                        ${parseFloat(item.price).toFixed(2)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))
        )}
      </motion.div>
    </section>
  );
}
