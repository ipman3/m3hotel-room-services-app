import { AnimatePresence, motion } from "framer-motion";
import { Mail, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";

interface ContactAction {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  target?: string;
  color?: string;
}

const contactFabActions: ContactAction[] = [
  {
    label: "Email",
    icon: Mail,
    href: "mailto:support@memoirepalace.com",
    color: "bg-blue-500",
  },
  {
    label: "Call Us",
    icon: Phone,
    href: "tel:+85512345678",
    color: "bg-orange-500",
  },
  {
    label: "Telegram",
    icon: Send,
    href: "https://t.me/yourusername",
    target: "_blank",
    color: "bg-sky-600",
  },
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

interface ContactFabMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactFabMenu({ isOpen, onClose }: ContactFabMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="absolute bottom-[100px] left-0 right-0 flex justify-center"
        >
          <div className="py-3 px-6 bg-muted-background/75 backdrop-blur-sm rounded-2xl shadow-lg">
            <div className="flex items-start gap-8">
              {contactFabActions.map((action) => {
                const Icon = action.icon;
                const buttonBg = action.color || "bg-base-secondary";
                return (
                  <motion.a
                    key={action.label}
                    href={action.href}
                    target={action.target}
                    rel={action.target ? "noopener noreferrer" : undefined}
                    variants={itemVariants}
                    className="flex flex-col items-center gap-2 cursor-pointer"
                    onClick={onClose}
                  >
                    <Button
                      size="icon"
                      className={`w-12 h-12 rounded-full ${buttonBg} shadow-md`}
                      aria-label={action.label}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </Button>
                    <h4 className="text-sm font-semibold text-foreground">
                      {action.label}
                    </h4>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
