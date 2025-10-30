import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/variantsAnimation";
import { useSpecialOffers } from "@/hooks/offer/useGetOffer";
import { Skeleton } from "@/components/ui/skeleton";

export default function MainPage() {
  const { data: specialOffers, isLoading, isError } = useSpecialOffers();
  const offerAndNewsItems = specialOffers?.data || [];

  return (
    <motion.div
      className="px-4 pt-4 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {isLoading &&
        [...Array(5)].map((_, index) => (
          <Skeleton className="w-full h-80 rounded-xl" key={index} />
        ))}
      {isError && <p>Error loading offers.</p>}
      {offerAndNewsItems.map((item) => (
        <motion.div
          key={item.id}
          variants={itemVariants}
          className="scroll-animate"
        >
          <Card className="p-0 overflow-hidden border-none rounded-xl customShadowSm">
            <CardContent className="p-0">
              <img
                src={item.image}
                alt={item.name}
                className="object-cover w-full h-44"
              />
              <div className="p-4 bg-white">
                <h3 className="text-lg font-bold capitalize">{item.name.replace(/_/g, " ")}</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {item.short_desc}
                </p>
                <Link
                  to="/offer/$offerId"
                  params={{ offerId: item.id.toString() }}
                  className="w-full"
                >
                  <Button className="w-full bg-base-primary">
                    View Detail
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
