import { useState } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  HelpCircle,
  Mail,
  Phone,
  Send,
  MessageCircleQuestion,
} from "lucide-react";

import { useNavItems } from "@/config/navItems";
import useNavbarStore from "@/store/Navbar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const fabActions = [
  { label: "FAQ", icon: HelpCircle, path: "/faq" },
  { label: "Contact Us", icon: Mail, path: "/contact-us" },
  { label: "Quick Contact", icon: Phone, action: "openDialog" },
];

const menuVariants = {
  hidden: {
    y: 50,
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function BottomNav() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navItems = useNavItems();

  const { isVisible } = useNavbarStore((state) => state);
  const [isFabOpen, setIsFabOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const leftNavItems = navItems.slice(0, 2);
  const rightNavItems = navItems.slice(2);

  const handleFabAction = (action: { path?: string; action?: string }) => {
    if (action.path) {
      navigate({ to: action.path });
    } else if (action.action === "openDialog") {
      setIsContactOpen(true);
    }
    setIsFabOpen(false);
  };

  if (!isVisible) return null;

  return (
    <>
      <nav
        className="fixed bottom-0 left-0 right-0 bg-muted-background z-50 shadow-[0_-2px_4px_-1px_rgba(0,0,0,0.16)]"
        aria-label="Bottom navigation"
      >
        <AnimatePresence>
          {isFabOpen && (
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="absolute bottom-[128px] left-0 right-0 flex justify-center"
            >
              <div className="flex items-center gap-4 p-3 bg-muted-background/75 rounded-full shadow-lg">
                {fabActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <motion.div key={action.label} variants={itemVariants}>
                      <Button
                        size="icon"
                        className="rounded-full w-12 h-12 bg-base-secondary"
                        onClick={() => handleFabAction(action)}
                        aria-label={action.label}
                      >
                        <Icon className="w-7 h-7" />
                      </Button>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <ul className="flex items-center justify-between h-16 my-4">
          {/* Left Nav Items */}
          {leftNavItems.map((item) => {
            const isActive = pathname === item.path;
            const IconComponent = item.icon as React.ElementType;
            return (
              <li key={item.path} className="flex justify-center flex-1">
                <motion.button
                  onClick={() => navigate({ to: item.path })}
                  className={`relative flex flex-col items-center justify-center text-sm transition-colors ${isActive ? "text-base-primary" : "text-muted-foreground"}`}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div
                    className="w-6 h-6 mb-1.5"
                    animate={{ y: isActive ? -5 : 0 }}
                  >
                    <IconComponent className="w-6 h-6" />
                  </motion.div>
                  <h3 className="font-semibold">{item.label}</h3>
                </motion.button>
              </li>
            );
          })}

          {/* Central FAB */}
          <li className="relative -top-9">
            <Button
            size={"sm"}
              onClick={() => setIsFabOpen(!isFabOpen)}
              className="w-14 h-14 bg-base-primary rounded-full customShadowXl"
            >
              <AnimatePresence initial={false}>
                <motion.div
                  key={isFabOpen ? "x" : "scan"}
                  initial={{ opacity: 0, rotate: -45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.3 }}
                >
                  {isFabOpen ? (
                    <X className="w-8 h-8" />
                  ) : (
                    <MessageCircleQuestion className="w-8 h-8" />
                  )}
                </motion.div>
              </AnimatePresence>
            </Button>
          </li>

          {/* Right Nav Items */}
          {rightNavItems.map((item) => {
            const isActive = pathname === item.path;
            const IconComponent = item.icon as React.ElementType;
            return (
              <li key={item.path} className="flex justify-center flex-1">
                <motion.button
                  onClick={() => navigate({ to: item.path })}
                  className={`relative flex flex-col items-center justify-center text-sm transition-colors ${isActive ? "text-base-primary" : "text-muted-foreground"}`}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div
                    className="w-6 h-6 mb-1.5"
                    animate={{ y: isActive ? -5 : 0 }}
                  >
                    <IconComponent className="w-6 h-6" />
                  </motion.div>
                  <h3 className="font-semibold">{item.label}</h3>
                </motion.button>
              </li>
            );
          })}
        </ul>
      </nav>


      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Quick Contact</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Choose your preferred method to get in touch with us instantly.
          </DialogDescription>
          <div className="flex justify-around pt-4">
            <a
              href="tel:+85512345678"
              className="flex flex-col items-center gap-2"
            >
              <Button
                size="icon"
                className="w-16 h-16 rounded-full bg-green-500 "
              >
                <Phone className="w-7 h-7" />
              </Button>
              <span>Call Us</span>
            </a>
            <a
              href="mailto:support@example.com"
              className="flex flex-col items-center gap-2"
            >
              <Button
                size="icon"
                className="w-16 h-16 rounded-full bg-blue-500 "
              >
                <Mail className="w-7 h-7" />
              </Button>
              <span>Email</span>
            </a>
            <a
              href="https://t.me/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2"
            >
              <Button
                size="icon"
                className="w-16 h-16 rounded-full bg-sky-500 "
              >
                <Send className="w-7 h-7" />
              </Button>
              <span>Telegram</span>
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
