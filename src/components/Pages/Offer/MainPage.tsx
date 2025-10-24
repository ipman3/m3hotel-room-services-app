import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { offerAndNewsItems } from "@/config/data/offer";
import { motion } from "framer-motion"; 
import { containerVariants, itemVariants } from "@/lib/variantsAnimation";

export default function MainPage() {
  return (
    <motion.div
      className="space-y-6 px-4 pt-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {offerAndNewsItems.map((item) => (
        <motion.div key={item.id} variants={itemVariants} className="scroll-animate">
          <Card className="overflow-hidden rounded-xl customShadowSm border-none p-0">
            <CardContent className="p-0">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-44 object-cover"
              />
              <div className="p-4 bg-white">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{item.description.slice(0, 100)}...</p>
                <Link to="/offer/$offerId" params={{ offerId: item.id }} className="w-full">
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

