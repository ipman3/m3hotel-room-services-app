import useNavbarStore from "@/store/Navbar";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Lottie from "lottie-react";
import successAnimation from "../../../public/assets/success.json";

export const Route = createFileRoute("/success/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { hide, show } = useNavbarStore((state) => state);

  useEffect(() => {
    hide();
    return () => {
      show();
    };
  }, [hide, show]);

  return (
    <div className="flex flex-col items-center justify-evenly h-screen px-4 space-y-4 bg-white">
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
          className="text-4xl text-base-secondary font-bold"
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
          className="w-full flex items-center justify-between mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        ></motion.div>
      </div>
      <div className="flex items-center justify-center gap-4 w-full">
        <Link
          to="/"
          className="block py-2 px-4 text-center rounded-md bg-base-primary text-background w-full"
        >
          Back to Home
        </Link>
        <Link
          to="/cart"
          className="block py-2 px-4 text-center rounded-md bg-background text-muted-foreground border w-2/4"
        >
          View Order
        </Link>
      </div>
    </div>
  );
}
