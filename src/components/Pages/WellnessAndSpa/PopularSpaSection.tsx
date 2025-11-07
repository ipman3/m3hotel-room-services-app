import ErrorState from "@/components/ErrorState";
import SkeletonHorizontalLoader from "@/components/SkeletonHorizentalLoader";
import { Card, CardContent } from "@/components/ui/card";
import { usePathId } from "@/hooks/usePathId";
import { usePopularSpas } from "@/hooks/wellness-spa/usePopularSpa";
import { containerVariants, itemVariants } from "@/lib/variantsAnimation";
import { useCategoryStore } from "@/store/CategoryStore";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

export default function PopularSpaSection() {
  const { activeCategory } = useCategoryStore();
  const { data: popularSpas, isLoading, isError } = usePopularSpas();
  const popularSpa = popularSpas?.data || [];
  const spaId = usePathId("/wellness-spa/");

  const filteredPopular =
    activeCategory === null
      ? popularSpa
      : popularSpa.filter((item) => item.category_id === activeCategory);

  return (
    <section>
      <div className="flex items-center justify-between px-4 mb-4">
        <h2 className="text-lg font-bold text-card-foreground">
          Most popular spa
        </h2>
        <Link to="/view-all/$spaId" params={{ spaId }}>
          <span className="text-sm font-semibold cursor-pointer text-base-accent">
            View All
          </span>
        </Link>
      </div>

      <motion.div
        className="flex gap-4 pb-3 pr-4 ml-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {isLoading ? (
          [...Array(5)].map((_, index) => (
            <SkeletonHorizontalLoader key={index} />
          ))
        ) : isError ? (
          <ErrorState />
        ) : (
          filteredPopular.slice(0, 5).map((item) => (
            <motion.div key={item.id} variants={itemVariants}>
              <div className="relative snap-start card-container">
                <Link
                  to="/wellness-spa/$serviceId"
                  params={{ serviceId: item.id.toString() }}
                  className="snap-start"
                >
                  <Card className="flex-shrink-0 w-40 p-0 border-none customShadowSm rounded-xl">
                    <CardContent className="p-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="object-cover w-full h-24 rounded-t-xl"
                        loading="lazy"
                      />
                      <div className="px-2 py-4">
                        <h3 className="font-semibold truncate">{item.name}</h3>
                        <p className="text-sm font-bold text-gray-800">
                          ${parseFloat(item.price).toFixed(2)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </section>
  );
}
