import useNavbarStore from "@/store/Navbar";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Lottie from "lottie-react";
import successAnimation from "../../../public/assets/success.json";
import { useCartStore } from "@/store/CartStore";

export const Route = createFileRoute("/success/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { hide, show } = useNavbarStore((state) => state);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart();
    hide();
    return () => {
      show();
    };
  }, [hide, show, clearCart]);

  return (
    <div className="flex flex-col items-center h-screen px-4 space-y-4 bg-white justify-evenly">
      <div className="flex flex-col items-center space-y-2">
        <motion.div
          className="w-[200px] md:w-[300px]"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.3 }}
        >
          <Lottie
            animationData={successAnimation}
            loop={false}
            width={"100%"}
            height={"100%"}
          />
        </motion.div>

        <motion.h1
          className="text-4xl font-bold text-base-secondary"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          Thank You!
        </motion.h1>

        <motion.p
          className="text-lg leading-6 text-center text-muted-foreground"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          We have received <br />
          your order.
        </motion.p>

        <motion.div
          className="flex items-center justify-between w-full mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        ></motion.div>
      </div>
      <div className="flex items-center justify-center w-full gap-4">
        <Link
          to="/"
          className="block w-full px-4 py-2 text-center rounded-md bg-base-primary text-background"
        >
          Back to Home
        </Link>
        <Link
          to="/orders"
          className="block w-2/4 px-4 py-2 text-center border rounded-md bg-background text-muted-foreground"
        >
          View Order
        </Link>
      </div>
    </div>
  );
}
