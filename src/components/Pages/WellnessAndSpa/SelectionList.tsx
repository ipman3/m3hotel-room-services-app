import { Card, CardContent } from "@/components/ui/card";
import { spaItems } from "@/config/data/wellness-spa";
import { usePathId } from "@/hooks/usePathId";
import { containerVariants, itemVariants } from "@/lib/variantsAnimation";
import { useCategoryStore } from "@/store/CategoryStore";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion"; 

export default function SelectionList() {
  const { activeCategory } = useCategoryStore();

  const filteredItems =
    activeCategory === "All"
      ? spaItems
      : spaItems.filter((item) => item.category === activeCategory);

  const viewId = usePathId('/wellness-spa/');

  return (
    <section className="px-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-card-foreground">Selection</h2>
        <Link to="/view-all/$viewId" params={{ viewId }}>
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
        {filteredItems.slice(0, 3).map((item) => (
          <motion.div key={item.id} variants={itemVariants}>
            <Link
              to="/wellness-spa/$serviceId"
              params={{ serviceId: item.id }}
            >
              <Card className="py-4 mb-4 overflow-hidden border-none customShadowSm rounded-xl scroll-animate">
                <CardContent className="flex items-center gap-4 px-4">
                  <img
                    src={item.imageUrl}
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
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

